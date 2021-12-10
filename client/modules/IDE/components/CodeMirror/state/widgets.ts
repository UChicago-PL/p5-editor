import * as React from "react"
import * as ReactDOM from "react-dom"

import {
  Decoration,
  DecorationSet,
  EditorView,
  Range,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view"
import { syntaxTree } from "@codemirror/language"
import { SyntaxNode } from "@lezer/common"

import { isEqual } from "lodash"
import { CmState, cmStatePlugin, initialCmState } from "./cmState"
import createColorPicker from "./colorPicker"
import colorRegex from "./colorRegex"
import { colorNames } from "./colorNames"
import ColorNamePicker from "../components/ColorNamePicker"

function codeString(view: EditorView, from: number, to?: number): string {
  return view.state.doc.sliceString(from, to)
}

function argListToIntList(view: EditorView, argList: SyntaxNode[]): number[] {
  return argList.map((child) =>
    parseInt(codeString(view, child.from, child.to)),
  )
}

// The `from` position is used to identify a node in the program.
// Don't want to store `to` position, because would need to update
// it if source code rewrite affects length (e.g. "true" to "false").
// Instead, to determine `to`, rely on widget position (via `posAtDOM`),
// or invariants about the source node (e.g. "true" or "false").
//
// Widget positions don't affect character positions in the doc.

class BoolWidget extends WidgetType {
  constructor(readonly initVal: boolean, readonly from: number) {
    super()
  }

  eq(other: BoolWidget) {
    return this.from === other.from && this.initVal === other.initVal
  }

  toDOM() {
    const theWidget = document.createElement("div")
    theWidget.dataset.from = this.from.toString()
    theWidget.className = "cm-bool-widget"

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.className = "cm-bool-checkbox-widget" // TODO better name
    checkbox.checked = this.initVal

    theWidget.appendChild(checkbox)
    return theWidget
  }

  ignoreEvent() {
    return false
  }
}

class NumWidget extends WidgetType {
  // If the number literal is negative, `from` does _not_ include "-"
  constructor(readonly isInc: boolean, readonly from: number) {
    super()
  }

  eq(other: NumWidget) {
    return this.from === other.from
  }

  toDOM() {
    const wrap = document.createElement("div")
    wrap.dataset.from = this.from.toString()
    wrap.className = "cm-num-widget"
    const btn = document.createElement("button")
    if (this.isInc) {
      btn.innerText = "+"
      btn.className = "cm-inc-widget"
    } else {
      btn.innerText = "−"
      btn.className = "cm-dec-widget"
    }
    wrap.appendChild(btn)
    return wrap
  }

  ignoreEvent() {
    return false
  }
}

function changeNum(view: EditorView, isInc: boolean, from: number) {
  const s = codeString(view, from)
    .match(/([0-9\-\.]+)([^0-9]?)/)!
    .splice(1)[0]
  const num =
    parseFloat(s) * (codeString(view, from - 1, from) === "-" ? -1 : 1)
  view.dispatch({
    changes: {
      // When the number is negative we need to overwrite the existing minus sign
      from: from - (num < 0 ? 1 : 0),
      to: from + s.length,
      insert: (isInc ? num + 1 : num - 1).toString(),
    },
  })
  return true
}

class SliderWidget extends WidgetType {
  constructor(
    readonly min: number,
    readonly max: number,
    readonly value: number,
    readonly step: number,
    readonly from: number,
  ) {
    super()
  }

  eq(other: SliderWidget) {
    return (
      this.min === other.min &&
      this.max === other.max &&
      this.step === other.step &&
      this.from === other.from
    )
  }

  toDOM() {
    const wrap = document.createElement("div")
    wrap.className = "cm-slider-widget"
    wrap.dataset.from = this.from.toString()
    const input = document.createElement("input")
    input.type = "range"
    input.min = this.min.toString()
    input.max = this.max.toString()
    input.step = this.step.toString()
    input.value = this.value.toString()
    wrap.appendChild(input)
    return wrap
  }

  ignoreEvent(e: Event) {
    // The mousedown event causes a weird issue where the event passes down into the editor
    // and the click is not registered with the slider
    return e.type === "mousedown"
  }
}

function changeSlider(
  view: EditorView,
  pos: number,
  from: number,
  value: string,
) {
  const regex = /(?<=Editor\.slider\(\s*\d+\s*,\s*\d+\s*,\s*)\d+/
  view.dispatch({
    changes: {
      from: from,
      to: pos,
      insert: view.state.doc.sliceString(from, pos).replace(regex, value),
    },
  })
  return true
}

const COLOR_FUNCS = ["color", "fill", "stroke", "background"]

const SPECIAL_FUNCS = ["slider", "shapeToolbox"]

function getFuncType(
  view: EditorView,
  argList: SyntaxNode,
): string | undefined {
  const variableName = argList.parent!.getChild("VariableName")
  if (!variableName) {
    // This is a method call
    const instanceVariableName = argList.parent
      ?.getChild("MemberExpression")
      ?.getChild("VariableName")
    const propertyVariableName = instanceVariableName?.nextSibling?.nextSibling
    if (
      instanceVariableName &&
      propertyVariableName &&
      codeString(view, instanceVariableName.from, instanceVariableName.to) ===
        "Editor"
    ) {
      const name = codeString(
        view,
        propertyVariableName.from,
        propertyVariableName.to,
      )
      if (SPECIAL_FUNCS.includes(name)) return name
    }
  } else {
    const name = codeString(view, variableName.from, variableName.to)
    if (COLOR_FUNCS.includes(name)) return "color"
  }
}

function isArgToSpecialFunc(view: EditorView, node: SyntaxNode): boolean {
  if (
    node.parent?.type?.name === "ArgList" &&
    node.parent?.parent?.type?.name === "CallExpression"
  ) {
    return !!getFuncType(view, node.parent!)
  } else if (
    node.parent?.type?.name === "ArrayExpression" &&
    node.parent?.parent?.type?.name === "ArgList" &&
    node.parent?.parent?.parent?.type?.name === "CallExpression"
  ) {
    return !!getFuncType(view, node.parent!.parent!)
  } else {
    return false
  }
}

function maybeColorFuncCall(
  s: string,
): { func: string; tupleArgs: boolean | null } | null {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges
  const m1 = s.match(
    /^(?<func>color|fill|stroke|background)\s*\(\d+,\s*\d+,\s*\d+\)$/,
  )
  const m2 = s.match(
    /^(?<func>color|fill|stroke|background)\s*\(\[\d+,\s*\d+,\s*\d+\]\)$/,
  )
  const m3 = s.match(/^(?<func>color|fill|stroke|background)\s*\(.*\)$/)

  if (m1 !== null) {
    return { func: m1.groups!.func, tupleArgs: false }
  } else if (m2 !== null) {
    return { func: m2.groups!.func, tupleArgs: true }
  } else if (m3 !== null) {
    return { func: m3.groups!.func, tupleArgs: null }
  }
  return null
}

function rgbToString(rgb: number[]): string {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

function fromRgbaString(s: string): { r: string; g: string; b: string } | null {
  // If a != 1, just revert to "rgba(...)" for simplicity
  const regex = /^rgba\((?<r>\d+),\s*(?<g>\d+),\s*(?<b>\d+),\s*1\)$/
  const m = s.match(regex)
  if (m !== null) {
    return { r: m.groups!.r, g: m.groups!.g, b: m.groups!.b }
  }
  return null
}

class ColorWidget extends WidgetType {
  constructor(readonly initColor: string, readonly from: number) {
    super()
  }

  eq(other: ColorWidget) {
    return this.from === other.from && this.initColor === other.initColor
  }

  toDOM() {
    const wrap = document.createElement("button")
    wrap.dataset.from = this.from.toString()
    wrap.className = "cm-color-widget"
    wrap.style.background = this.initColor
    let child = document.createElement("div")
    wrap.appendChild(child)

    const destroyColorPicker = () => {
      // Part of destroying the color picker involves destroying its parent
      // thus it is necessary to recreate it
      child = document.createElement("div")
      wrap.appendChild(child)
    }

    wrap.onclick = (e) => {
      createColorPicker(
        child,
        this.initColor,
        (newColor) => {
          const event = new CustomEvent("colorChosen", {
            bubbles: true,
            detail: newColor,
          })
          wrap.dispatchEvent(event)
        },
        destroyColorPicker,
      )
    }
    return wrap
  }

  ignoreEvent() {
    return false
  }
}

class ColorNameWidget extends WidgetType {
  wrap: HTMLElement | null = null
  active: boolean = false

  constructor(readonly initColor: string, readonly from: number) {
    super()
  }

  eq(other: ColorWidget) {
    const eq_ = this.from === other.from && this.initColor == other.initColor
    if (!eq_) {
      // Hacky way to tell that a widget will be removed
      document.removeEventListener("click", this.clickListener)
      document.removeEventListener("keydown", this.escListener)
    }
    return eq_
  }

  toDOM() {
    const wrap = document.createElement("button")
    wrap.dataset.from = this.from.toString()
    wrap.className = "cm-color-widget"
    wrap.style.background = this.initColor

    // I hate to do this, but saving wrap as a class property is the only
    // way to make it so that the event listener can remain a function with
    // only the event argument. And this is necessary so that it is possible
    // to call document.removeEventListener later on
    this.wrap = wrap
    document.addEventListener("click", this.clickListener)
    document.addEventListener("keydown", this.escListener)

    return wrap
  }

  destroy() {
    let pickerWrap = document.getElementById("color-name-picker")
    if (pickerWrap) {
      ReactDOM.unmountComponentAtNode(pickerWrap)
    }
    this.active = false
  }

  // This has to be an arrow function to preserve the right `this`
  clickListener = (e: MouseEvent) => {
    let pickerWrap = document.getElementById("color-name-picker")
    if (!pickerWrap) {
      pickerWrap = document.createElement("div")
      pickerWrap.id = "color-name-picker"
      document.body.prepend(pickerWrap)
    }

    if (this.active && !pickerWrap.contains(e.target as Node)) {
      this.destroy()
    } else if (!this.active && this.wrap!.contains(e.target as Node)) {
      this.active = true

      const cb = (newColor: string | null) => {
        if (newColor) {
          const event = new CustomEvent("colorChosen", {
            bubbles: true,
            detail: newColor,
          })
          this.wrap!.dispatchEvent(event)
        }
        this.destroy()
      }

      ReactDOM.render(
        React.createElement(ColorNamePicker, {
          cb,
          initColor: this.initColor,
          wrap: this.wrap!,
        }),
        pickerWrap,
      )
    }
  }

  escListener = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      this.destroy()
    }
  }

  ignoreEvent() {
    return false
  }
}

function changeColor(
  view: EditorView,
  pos: number,
  color: string,
  from: number,
) {
  const colorFuncCall = maybeColorFuncCall(codeString(view, from, pos))
  const rgba = fromRgbaString(color)

  let insert: string
  if (rgba !== null) {
    if (colorFuncCall && colorFuncCall.tupleArgs) {
      insert = `${colorFuncCall.func}([${rgba.r}, ${rgba.g}, ${rgba.b}])`
    } else if (colorFuncCall && !colorFuncCall.tupleArgs) {
      insert = `${colorFuncCall.func}(${rgba.r}, ${rgba.g}, ${rgba.b})`
    } else {
      insert = `"${color}"`
    }
  } else {
    if (colorFuncCall) {
      insert = `${colorFuncCall.func}("${color}")`
    } else {
      insert = `"${color}"`
    }
  }
  view.dispatch({ changes: { from, to: pos, insert } })
  return true
}

class ShapeToolboxWidget extends WidgetType {
  constructor(
    readonly cb: () => void,
    readonly from: number,
    readonly to: number,
  ) {
    super()
  }

  eq(other: ShapeToolboxWidget) {
    return this.from === other.from && this.to === other.to
  }

  toDOM() {
    const wrap = document.createElement("button")
    wrap.innerText = "show"
    wrap.dataset.from = this.from.toString()
    wrap.className = "cm-shape-toolbox-widget"
    wrap.onclick = this.cb
    return wrap
  }

  ignoreEvent() {
    return false
  }
}

type WidgetProps = {
  shapeToolboxCb: (loc: [number, number], existing: string) => void
  onWidgetChange: (widgetType: string) => void
}

function createWidgets(
  view: EditorView,
  showWidgets: CmState,
  { shapeToolboxCb }: WidgetProps,
) {
  const widgets: Range<Decoration>[] = []

  const addWidget = (decoration: Decoration, loc: number) => {
    widgets.push(decoration.range(loc, loc))
  }

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (type, from, to, get) => {
        if (
          type.name === "Number" &&
          showWidgets.showNumWidgets &&
          !isArgToSpecialFunc(view, get())
        ) {
          const decoDec = Decoration.widget({
            widget: new NumWidget(false, from),
            side: 1,
          })
          const decoInc = Decoration.widget({
            widget: new NumWidget(true, from),
            side: 1,
          })
          // Negative sign, if any, is not part of this Number node, so
          // check `from` - 1 (disallowing spaces after unary negation operator)
          addWidget(
            decoDec,
            codeString(view, from - 1, from) === "-" ? from - 1 : from,
          )
          addWidget(decoInc, to)
        } else if (
          type.name === "String" &&
          showWidgets.showColorWidgets &&
          !isArgToSpecialFunc(view, get())
        ) {
          // + 1 and - 1 to avoid the quotation marks
          const val = codeString(view, from + 1, to - 1)

          // TODO move
          if (val.match(colorRegex)) {
            const deco = Decoration.widget({
              widget: new ColorWidget(val, from),
              side: 1,
            })
            addWidget(deco, to)
          } else if (Object.keys(colorNames).includes(val.toLowerCase())) {
            const deco = Decoration.widget({
              widget: new ColorNameWidget(val.toLowerCase(), from),
              side: 1,
            })
            addWidget(deco, to)
          }
        } else if (
          type.name === "BooleanLiteral" &&
          showWidgets.showBoolWidgets
        ) {
          const initVal = codeString(view, from).startsWith("true")
          const deco = Decoration.widget({
            widget: new BoolWidget(initVal, from),
            side: 1,
          })
          addWidget(deco, from) // `from` to draw widget on left
        } else if (type.name === "ArgList") {
          const argList = get()
          const funcType = getFuncType(view, argList)

          if (funcType === "color" && showWidgets.showColorWidgets) {
            const argListStrings = argList.getChildren("String")
            const argListNumbers = argList.getChildren("Number")
            const argListArrayExp = argList.getChild("ArrayExpression")

            const makeWidget = (color: string, colorName: boolean = false) => {
              const widget = colorName
                ? new ColorNameWidget(color, argList.parent!.from)
                : new ColorWidget(color, argList.parent!.from)
              const deco = Decoration.widget({
                widget,
                side: 1,
              })
              addWidget(deco, argList.parent!.to)
            }

            if (argListStrings.length === 1) {
              // avoid the quotation marks and parentheses (assuming no spaces)
              const val = codeString(view, from + 2, to - 2)
              if (val.match(colorRegex)) {
                makeWidget(val)
              } else if (Object.keys(colorNames).includes(val.toLowerCase())) {
                makeWidget(val.toLowerCase(), true)
              }
              // TODO: handle 4, twice
            } else if (argListNumbers.length === 3) {
              makeWidget(rgbToString(argListToIntList(view, argListNumbers)))
            } else if (
              argListArrayExp &&
              argListArrayExp.getChildren("Number").length === 3
            ) {
              makeWidget(
                rgbToString(
                  argListToIntList(view, argListArrayExp.getChildren("Number")),
                ),
              )
            }
          } else if (funcType === "slider") {
            const argListNumbers = argList.getChildren("Number")
            if (argListNumbers.length === 3 || argListNumbers.length === 4) {
              const [min, max, value, step = 1] = argListToIntList(
                view,
                argListNumbers,
              )
              const deco = Decoration.widget({
                widget: new SliderWidget(
                  min,
                  max,
                  value,
                  step,
                  argList.parent!.from,
                ),
                side: 1,
              })
              addWidget(deco, argList.parent!.to)
            }
          } else if (funcType === "shapeToolbox") {
            const { from, to } = argList.parent!
            const loc = [from, to] as [number, number]
            let cb = () => shapeToolboxCb(loc, "")

            const block = argList.getChild("ArrowFunction")?.getChild("Block")
            if (block) {
              cb = () =>
                shapeToolboxCb(
                  loc,
                  view.state.doc.sliceString(block.from, block.to),
                )
            }

            const deco = Decoration.widget({
              widget: new ShapeToolboxWidget(cb, from, to),
              side: 1,
            })
            addWidget(deco, argList.parent!.to)
          }
        } else {
          // console.log("No widgets for", type.name)
        }
      },
    })
  }
  // Widgets must be sorted by their starting location or else Codemirror will throw
  // `widgets` may be unsorted in the case of nested widgets (numbers inside of
  // the shape toolbox lambda)
  const sortedWidgets = widgets.sort((r1, r2) => r1.from - r2.from)
  return Decoration.set(sortedWidgets)
}

function unwrap(value: any, errorMessage: string) {
  if (value === null || value === undefined) {
    throw new Error(errorMessage)
  } else {
    return value
  }
}

export const widgetsPlugin = (props: WidgetProps) =>
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet

      constructor(view: EditorView) {
        this.decorations = createWidgets(view, initialCmState, props)
      }

      // noinspection JSUnusedGlobalSymbols
      update(update: ViewUpdate) {
        if (
          update.docChanged ||
          update.viewportChanged ||
          !isEqual(
            update.startState.field(cmStatePlugin),
            update.state.field(cmStatePlugin),
          )
        )
          this.decorations = createWidgets(
            update.view,
            update.state.field(cmStatePlugin),
            props,
          )
      }
    },
    {
      decorations: (v) => v.decorations,

      eventHandlers: {
        mousedown: (e, view) => {
          const target = e.target as HTMLElement
          if (
            target.classList.contains("cm-inc-widget") ||
            target.classList.contains("cm-dec-widget")
          ) {
            let interval = setInterval(() => {
              const from = unwrap(
                target.parentElement!.dataset.from,
                "Missing 'from' dataset value",
              )
              const isIncrease = target.classList.contains("cm-inc-widget");
              props.onWidgetChange(isIncrease ? 'inc-val' : 'dec-val')
              changeNum(view, isIncrease, parseInt(from))
            }, 100)

            document.body.addEventListener("mouseup", () =>
              clearInterval(interval),
            )

            return true
          }
        },
        click: (e, view) => {
          const target = e.target as HTMLElement
          if (target.classList.contains("cm-bool-checkbox-widget")) {
            // TODO
            const from = parseInt(
              unwrap(
                target.parentElement!.dataset.from,
                "Missing 'from' dataset value",
              ),
            )
            const b = codeString(view, from).startsWith("true")
            props.onWidgetChange(b ? 'bool-t' : 'bool-f')
            view.dispatch({
              changes: {
                from,
                to: from + b.toString().length,
                insert: (!b).toString(),
              },
            })
            return true
          } else if (
            target.parentElement!.classList.contains("cm-slider-widget")
          ) {
            // The slider relies on the "click" event as opposed to the "input" event
            // because codemirror does not pick up on the latter for some reason
            const target = e.target as HTMLInputElement
            const from = unwrap(
              target.parentElement!.dataset.from,
              "Missing 'from' dataset value",
            )
            props.onWidgetChange('slider')
            return changeSlider(
              view,
              view.posAtDOM(target),
              parseInt(from),
              target.value,
            )
          }
        },
        colorChosen: (e, view) => {
          const from = unwrap(
            e.target.dataset.from,
            "Missing 'from' dataset value",
          )
          props.onWidgetChange('color-picked')
          return changeColor(
            view,
            view.posAtDOM(e.target),
            e.detail,
            parseInt(from),
          )
        },
      },
    },
  )
