import * as ActionTypes from '../../../constants';
import { setGlobalTrack } from '../../../utils/analytics';

const initialState = {
  autocloseBracketsQuotes: true,
  autocomplete: true,
  autorefresh: false,
  autosave: true,
  fontSize: 18,
  gridOutput: false,
  language: 'en-US',
  lineNumbers: true,
  linewrap: true,
  lintWarning: false,
  soundOutput: false,
  textOutput: false,
  theme: 'light'
};

const preferences = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FONT_SIZE:
      return Object.assign({}, state, { fontSize: action.value });
    case ActionTypes.SET_AUTOSAVE:
      return Object.assign({}, state, { autosave: action.value });
    case ActionTypes.SET_LINEWRAP:
      return Object.assign({}, state, { linewrap: action.value });
    case ActionTypes.SET_LINT_WARNING:
      return Object.assign({}, state, { lintWarning: action.value });
    case ActionTypes.SET_TEXT_OUTPUT:
      return Object.assign({}, state, { textOutput: action.value });
    case ActionTypes.SET_GRID_OUTPUT:
      return Object.assign({}, state, { gridOutput: action.value });
    case ActionTypes.SET_SOUND_OUTPUT:
      return Object.assign({}, state, { soundOutput: action.value });
    case ActionTypes.SET_PREFERENCES:
      setGlobalTrack('liveMode', action.preferences.autorefresh);
      return { ...initialState, ...action.preferences };
    case ActionTypes.SET_THEME:
      return Object.assign({}, state, { theme: action.value });
    case ActionTypes.SET_AUTOREFRESH:
      return Object.assign({}, state, { autorefresh: action.value });
    case ActionTypes.SET_LINE_NUMBERS:
      return Object.assign({}, state, { lineNumbers: action.value });
    case ActionTypes.SET_LANGUAGE:
      return Object.assign({}, state, { language: action.language });
    case ActionTypes.SET_AUTOCLOSE_BRACKETS_QUOTES:
      return Object.assign({}, state, { autocloseBracketsQuotes: action.value });
    case ActionTypes.SET_AUTOCOMPLETE:
      return Object.assign({}, state, { autocomplete: action.value });
    default:
      return state;
  }
};

export default preferences;
