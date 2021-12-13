import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { EditorView, KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { langPlugin, setLang } from '../state/lang';

import autocomplete from '../state/autocomplete';
import { widgetsPlugin } from '../state/widgets';
import {
  cmStatePlugin,
  setShowBoolWidgets,
  setShowColorWidgets,
  setCurrentLanguage,
  setShowNumWidgets
} from '../state/cmState';
import { keywordPlugin, Keywords } from '../state/keywordPlugin';
import { Dispatch, State } from '../state/state';

export type ExternalProps = {
  onChange: (code: string) => void;
  code: string;
  lang: string;
  shapeToolboxCb: (loc: [number, number], existing: string) => void;
  provideView: (view: EditorView) => void;
  keyBindings: KeyBinding[];
  extensions: Extension[];
  keywords: Keywords;
  onWidgetChange: () => void;
};

type Props = {
  state: State;
  dispatch: Dispatch;
  externalProps: ExternalProps;
};

export default function Editor({ state, dispatch, externalProps }: Props) {
  const cmParent = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<EditorView | null>(null);

  useEffect(() => {
    const { shapeToolboxCb, onWidgetChange } = externalProps;
    const widgetProps = { shapeToolboxCb, onWidgetChange };
    const localView = new EditorView({
      state: EditorState.create({
        extensions: [
          keymap.of(externalProps.keyBindings),
          autocomplete(externalProps.keywords),
          basicSetup,
          langPlugin(externalProps.lang),

          // @ts-ignore
          keymap.of([indentWithTab]),

          cmStatePlugin,
          widgetsPlugin(widgetProps),
          ...keywordPlugin(externalProps.keywords),
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
              externalProps.onChange(v.state.doc.toString());
            }
          }),
          ...externalProps.extensions
        ],
        doc: externalProps.code
      }),
      parent: cmParent.current!
    });
    setView(localView);
    externalProps.provideView(localView);
  }, []);

  useEffect(() => {
    if (view) {
      view.dispatch({
        effects: [
          setShowBoolWidgets.of(state.showBoolWidgets),
          setShowColorWidgets.of(state.showColorWidgets),
          setShowNumWidgets.of(state.showNumWidgets),
          setCurrentLanguage.of(state.lang)
        ]
      });
    }
  }, [state.showBoolWidgets, state.showColorWidgets, state.showNumWidgets, externalProps.lang]);

  useEffect(() => {
    if (view && view.state.doc.toString() !== externalProps.code) {
      const currentPos = view.state.selection.main.head;
      const tr = view.state.update({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: externalProps.code
        }
      });
      view.dispatch(tr);
      // This makes sure that the cursor doesn't jump to the beginning
      // when the entire document is updated, like in the case of tidying code
      const newPos = Math.min(currentPos, externalProps.code.length - 1);
      view.dispatch({ selection: { anchor: newPos } });
    }
  }, [externalProps.code]);

  useEffect(() => {
    if (view && state.lang !== externalProps.lang) {
      dispatch({
        type: 'setLang',
        value: externalProps.lang
      });
      setLang(view, externalProps.lang);
      view.dispatch({
        effects: [setCurrentLanguage.of(externalProps.lang)]
      });
    }
  }, [externalProps.lang]);

  return <div className="codemirror__editor" ref={cmParent} />;
}
