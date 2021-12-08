import { Compartment } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';

const languageConf = new Compartment();

function langToPlugin(mode: string) {
  switch (mode) {
    case 'javascript':
      return javascript();
    case 'htmlmixed':
      return html();
    case 'css':
      return css();
    case 'application/json':
      return json();
    default:
      return markdown();
  }
}

export function setLang(view: EditorView, lang: string) {
  const effect = languageConf.reconfigure(langToPlugin(lang));
  view.dispatch({ effects: effect });
}

export function langPlugin(lang: string) {
  return languageConf.of(langToPlugin(lang));
}
