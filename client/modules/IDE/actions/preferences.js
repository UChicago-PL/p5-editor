import i18next from 'i18next';
import apiClient from '../../../utils/apiClient';
import * as ActionTypes from '../../../constants';

function updatePreferences(formParams, dispatch) {
  apiClient
    .put('/preferences', formParams)
    .then(() => {})
    .catch((error) => {
      const { response } = error;
      dispatch({ type: ActionTypes.ERROR, error: response.data });
    });
}

function createPreferenceUpdate(type, prefName) {
  return (value) => (dispatch, getState) => {
    dispatch({ type, value });
    const state = getState();
    if (state.user.authenticated) {
      const formParams = { preferences: { [prefName]: value } };
      updatePreferences(formParams, dispatch);
    }
  };
}
export const setFontSize = createPreferenceUpdate(ActionTypes.SET_FONT_SIZE, 'fontSize');
export const setLineNumbers = createPreferenceUpdate(ActionTypes.SET_LINE_NUMBERS, 'lineNumbers');
export const setAutocloseBracketsQuotes = createPreferenceUpdate(
  ActionTypes.SET_AUTOCLOSE_BRACKETS_QUOTES,
  'autocloseBracketsQuotes'
);
export const setAutocomplete = createPreferenceUpdate(ActionTypes.SET_AUTOCOMPLETE, 'autocomplete');
export const setAutosave = createPreferenceUpdate(ActionTypes.SET_AUTOSAVE, 'autosave');
export const setLinewrap = createPreferenceUpdate(ActionTypes.SET_LINEWRAP, 'linewrap');
export const setLintWarning = createPreferenceUpdate(ActionTypes.SET_LINT_WARNING, 'lintWarning');
export const setTextOutput = createPreferenceUpdate(ActionTypes.SET_TEXT_OUTPUT, 'textOutput');
export const setGridOutput = createPreferenceUpdate(ActionTypes.SET_GRID_OUTPUT, 'gridOutput');
export const setSoundOutput = createPreferenceUpdate(ActionTypes.SET_SOUND_OUTPUT, 'soundOutput');
export const setTheme = createPreferenceUpdate(ActionTypes.SET_THEME, 'theme');
export const setAutorefresh = createPreferenceUpdate(ActionTypes.SET_AUTOREFRESH, 'autorefresh');

export function setAllAccessibleOutput(value) {
  return (dispatch) => {
    dispatch(setTextOutput(value));
    dispatch(setGridOutput(value));
    dispatch(setSoundOutput(value));
  };
}

export function setLanguage(value, { persistPreference = true } = {}) {
  return (dispatch, getState) => {
    i18next.changeLanguage(value);
    dispatch({
      type: ActionTypes.SET_LANGUAGE,
      language: value
    });
    const state = getState();
    if (persistPreference && state.user.authenticated) {
      const formParams = {
        preferences: {
          language: value
        }
      };
      updatePreferences(formParams, dispatch);
    }
  };
}
