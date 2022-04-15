import * as React from 'react';
import { setGlobalTrack, trackEvent, appSettingsToIndex } from '../../../../../utils/analytics';
import { ThemeConfig } from './theme-plugin';

export type State = {
  showBoolWidgets: boolean;
  showNumWidgets: boolean;
  showColorWidgets: boolean;
  lang: string;
};

export type ToggleBoolWidgets = { type: 'toggleBoolWidgets' };
export type ToggleNumWidgets = { type: 'toggleNumWidgets' };
export type ToggleColorWidgets = { type: 'toggleColorWidgets' };
export type SetLang = { type: 'setLang'; value: string };
export type SetTheme = { type: 'setTheme'; value: ThemeConfig };

type Action = ToggleBoolWidgets | ToggleNumWidgets | ToggleColorWidgets | SetLang | SetTheme;

export type Dispatch = React.Dispatch<Action>;

export const initialState = {
  showBoolWidgets: false,
  showNumWidgets: false,
  showColorWidgets: true,
  lang: ''
};

export function reducer(state: State, action: Action): State {
  let newState: State;
  let settingsToggled = true;
  switch (action.type) {
    case 'toggleBoolWidgets':
      newState = { ...state, showBoolWidgets: !state.showBoolWidgets };
      break;
    case 'toggleNumWidgets':
      newState = { ...state, showNumWidgets: !state.showNumWidgets };
      break;
    case 'toggleColorWidgets':
      newState = { ...state, showColorWidgets: !state.showColorWidgets };
      break;
    case 'setLang':
      newState = { ...state, lang: (action as SetLang).value };
      break;
    default:
      newState = state;
      settingsToggled = false;
      break;
  }

  const oldSettingsString = appSettingsToIndex();
  ['showBoolWidgets', 'showNumWidgets', 'showColorWidgets'].forEach((key) => {
    setGlobalTrack(key, (newState as any)[key]);
  });
  if (settingsToggled) {
    trackEvent({ eventName: 'toggleSettings', context: [oldSettingsString] });
  }
  return newState;
}
