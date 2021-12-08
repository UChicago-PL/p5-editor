import { StateEffect, StateField } from "@codemirror/state"
import { initialState } from "./state"

export const setShowBoolWidgets = StateEffect.define<boolean>()
export const setShowNumWidgets = StateEffect.define<boolean>()
export const setShowColorWidgets = StateEffect.define<boolean>()
export const setCurrentLanguage = StateEffect.define<string>()

export type CmState = {
  showBoolWidgets: boolean
  showNumWidgets: boolean
  showColorWidgets: boolean
  lang: string
}

export const initialCmState = {
  showBoolWidgets: initialState.showBoolWidgets,
  showNumWidgets: initialState.showNumWidgets,
  showColorWidgets: initialState.showColorWidgets,
  lang: initialState.lang
}

function reducer(state: CmState, effect: StateEffect<any>) {
  if (effect.is(setShowBoolWidgets))
    return { ...state, showBoolWidgets: effect.value }
  else if (effect.is(setShowNumWidgets))
    return { ...state, showNumWidgets: effect.value }
  else if (effect.is(setShowColorWidgets))
    return { ...state, showColorWidgets: effect.value }
    else if (effect.is(setCurrentLanguage))
    return { ...state, lang: effect.value }
  else return state
}

export const cmStatePlugin = StateField.define({
  create: () => initialCmState,
  update(state, tr) {
    let newState = state
    for (const effect of tr.effects) {
      newState = reducer(newState, effect)
    }
    return newState
  },
})
