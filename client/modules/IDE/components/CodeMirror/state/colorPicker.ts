import "@simonwep/pickr/dist/themes/classic.min.css"
import Pickr from "@simonwep/pickr"

export default function createColorPicker(
  el: HTMLElement,
  color: string,
  cb: (color: string) => void,
  destroy_: () => void,
) {
  // For the point of this line, see long comment below
  const { top, left } = el.getBoundingClientRect()

  const colorPicker = Pickr.create({
    el,
    theme: "classic",
    default: color,
    padding: 0,
    // Stop NanoPop from messing with our custom positioning on scroll
    autoReposition: false,

    swatches: [
      "rgb(244, 67, 54)",
      "rgb(233, 30, 99)",
      "rgb(156, 39, 176)",
      "rgb(103, 58, 183)",
      "rgb(63, 81, 181)",
      "rgb(33, 150, 243)",
      "rgb(3, 169, 244)",
      "rgb(0, 188, 212)",
      "rgb(0, 150, 136)",
      "rgb(76, 175, 80)",
      "rgb(139, 195, 74)",
      "rgb(205, 220, 57)",
      "rgb(255, 235, 59)",
      "rgb(255, 193, 7)",
    ],

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: false,
        hsva: false,
        cmyk: false,
        input: true,
        clear: false,
        // false because it looks nicer
        // and because colorPicker.on("clear")...
        // doesn't work nicely straight away
        save: true,
      },
    },
  })

  // A very hacky way to get around broken Pickr positioning
  // First we hide the picker so that it is not shown in its initial incorrect position
  // Then, after we can guarantee that it has rendered (100ms is usually enough),
  // we manually set the position to be next to the button element

  // @ts-ignore
  const pickerEl = colorPicker.getRoot()["app"] as HTMLElement
  pickerEl.style.visibility = "hidden"

  setTimeout(() => {
    pickerEl.style.visibility = "visible"
    pickerEl.style.top = top + "px"
    pickerEl.style.left = left + "px"
  }, 100)

  colorPicker.show()

  function destroy() {
    colorPicker.destroyAndRemove()
    destroy_()
  }

  colorPicker.on("save", (color: Pickr.HSVaColor) => {
    let colorArray
    switch (colorPicker.getColorRepresentation()) {
      case "HEXA":
        colorArray = color.toHEXA()
        break
      case "HSVA":
        colorArray = color.toHSVA()
        break
      case "HSLA":
        colorArray = color.toHSLA()
        break
      case "CMYK":
        colorArray = color.toCMYK()
        break
      default:
        colorArray = color.toRGBA()
        break
    }
    // 0 is for rounding
    // noinspection TypeScriptValidateJSTypes
    cb(colorArray.toString(0))
    destroy()
  })

  colorPicker.on("hide", destroy)
}
