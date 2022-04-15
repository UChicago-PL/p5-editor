import { StateEffect, StateField } from '@codemirror/state';
import { initialState } from './state';
import { ThemeConfig } from './theme-plugin';
import { setGlobalTrack } from '../../../../../utils/analytics';

export const setShowBoolWidgets = StateEffect.define<boolean>();
export const setShowNumWidgets = StateEffect.define<boolean>();
export const setShowColorWidgets = StateEffect.define<boolean>();
export const setCurrentLanguage = StateEffect.define<string>();
export const setCurrentTheme = StateEffect.define<ThemeConfig | undefined>();

export type CmState = {
  showBoolWidgets: boolean;
  showNumWidgets: boolean;
  showColorWidgets: boolean;
  lang: string;
  theme: ThemeConfig;
};

export const initialCmState = {
  showBoolWidgets: initialState.showBoolWidgets,
  showNumWidgets: initialState.showNumWidgets,
  showColorWidgets: initialState.showColorWidgets,
  lang: initialState.lang,
  theme: {}
};

function reducer(state: CmState, effect: StateEffect<any>) {
  if (effect.is(setShowBoolWidgets)) return { ...state, showBoolWidgets: effect.value };
  else if (effect.is(setShowNumWidgets)) return { ...state, showNumWidgets: effect.value };
  else if (effect.is(setShowColorWidgets)) return { ...state, showColorWidgets: effect.value };
  else if (effect.is(setCurrentLanguage)) return { ...state, lang: effect.value };
  else if (effect.is(setCurrentTheme)) return { ...state, theme: effect.value || {} };
  else return state;
}

export const cmStatePlugin = StateField.define({
  create: () => {
    ['showBoolWidgets', 'showNumWidgets', 'showColorWidgets'].forEach((key) =>
      setGlobalTrack(key, initialCmState[key])
    );
    return initialCmState;
  },
  update(state, tr) {
    let newState = state;
    for (const effect of tr.effects) {
      newState = reducer(newState, effect);
    }
    return newState;
  }
});
