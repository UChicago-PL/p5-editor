import * as React from 'react';
import { useReducer } from 'react';

import './../assets/scss/App.scss';
import Editor, { ExternalProps } from './Editor';

import { initialState, reducer } from '../state/state';
import Menu from './Menu';

export default function App(props: ExternalProps) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    lang: props.lang
  });

  return (
    <div className="codemirror__root">
      <Editor state={state} dispatch={dispatch} externalProps={props} />
      <Menu state={state} dispatch={dispatch} />
    </div>
  );
}
