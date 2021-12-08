import * as React from "react"
import { Dispatch, State } from "../state/state"

type Props = {
  dispatch: Dispatch
  state: State
}

export default function Menu({ dispatch, state }: Props) {
  return (
    <div className="codemirror__menu">
      {/*<button onClick={() => dispatch({ type: "toggleBoolWidgets" })}>*/}
      {/*  Toggle Bool*/}
      {/*</button>*/}
      <button onClick={() => dispatch({ type: "toggleNumWidgets" })}>
        {state.showNumWidgets ? "Hide" : "Show"} Number Pickers
      </button>
      <button onClick={() => dispatch({ type: "toggleColorWidgets" })}>
        {state.showColorWidgets ? "Hide" : "Show"} Color Pickers
      </button>
    </div>
  )
}
