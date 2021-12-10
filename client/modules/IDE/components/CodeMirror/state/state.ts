import * as React from "react"

export type State = {
  showBoolWidgets: boolean
  showNumWidgets: boolean
  showColorWidgets: boolean
  lang: string
}

export type ToggleBoolWidgets = { type: "toggleBoolWidgets" }
export type ToggleNumWidgets = { type: "toggleNumWidgets" }
export type ToggleColorWidgets = { type: "toggleColorWidgets" }
export type SetLang = { type: "setLang"; value: string }

type Action =
  | ToggleBoolWidgets
  | ToggleNumWidgets
  | ToggleColorWidgets
  | SetLang

export type Dispatch = React.Dispatch<Action>

export const initialState = {
  showBoolWidgets: false,
  showNumWidgets: false,
  showColorWidgets: true,
  lang: "",
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggleBoolWidgets":
      return { ...state, showBoolWidgets: !state.showBoolWidgets }
    case "toggleNumWidgets":
      return { ...state, showNumWidgets: !state.showNumWidgets }
    case "toggleColorWidgets":
      return { ...state, showColorWidgets: !state.showColorWidgets }
    case "setLang":
      return { ...state, lang: action.value }
  }
}
