import * as React from "react"
import {setGlobalTrack, trackEvent} from '../../../../../utils/analytics'

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
  let newState: State;
  console.log('cm state event', action.type)
  switch (action.type) {
    case "toggleBoolWidgets":
      newState = { ...state, showBoolWidgets: !state.showBoolWidgets }
      break;
    case "toggleNumWidgets":
      newState = { ...state, showNumWidgets: !state.showNumWidgets }
      break;
    case "toggleColorWidgets":
      newState = { ...state, showColorWidgets: !state.showColorWidgets }
      break;
    case "setLang":
      newState = { ...state, lang: (action as SetLang).value }
      break;
  }

  ['showBoolWidgets', 'showNumWidgets', 'showColorWidgets'].forEach(key => {
    setGlobalTrack(key, (newState as any)[key]);
    trackEvent({eventName: 'toggleSettings'})
  })
  return newState
}
