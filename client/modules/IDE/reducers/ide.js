import * as ActionTypes from '../../../constants';

const initialState = {
  isPlaying: false,
  isAccessibleOutputPlaying: false,
  modalIsVisible: false,
  sidebarIsExpanded: false,
  consoleIsExpanded: true,
  preferencesIsVisible: false,
  projectOptionsVisible: false,
  newFolderModalVisible: false,
  uploadFileModalVisible: false,
  submitModalVisible: false,
  editorOptionsVisible: false,
  keyboardShortcutVisible: false,
  unsavedChanges: false,
  infiniteLoop: false,
  previewIsRefreshing: false,
  isAutoRefresh: false,
  infiniteLoopMessage: '',
  justOpenedProject: false,
  previousPath: '/',
  errorType: undefined,
  runtimeErrorWarningVisible: true,
  parentId: undefined,
  showingShapeToolbox: false,
  shapeToolboxCodeLoc: null,
  shapeToolboxExistingCalls: [],
  isStale: false,
  isShowing: false
};

const ide = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionTypes.START_SKETCH:
      return Object.assign({}, state, { isPlaying: true });
    case ActionTypes.STOP_SKETCH:
      return Object.assign({}, state, { isPlaying: false, isShowing: false });
    case ActionTypes.START_ACCESSIBLE_OUTPUT:
      return Object.assign({}, state, { isAccessibleOutputPlaying: true });
    case ActionTypes.STOP_ACCESSIBLE_OUTPUT:
      return Object.assign({}, state, { isAccessibleOutputPlaying: false });
    case ActionTypes.CONSOLE_EVENT:
      return Object.assign({}, state, { consoleEvent: action.event });
    case ActionTypes.SHOW_MODAL:
      return Object.assign({}, state, {
        modalIsVisible: true,
        parentId: action.parentId,
        newFolderModalVisible: false
      });
    case ActionTypes.HIDE_MODAL:
      return Object.assign({}, state, { modalIsVisible: false, uploadFileModalVisible: false });
    case ActionTypes.COLLAPSE_SIDEBAR:
      return Object.assign({}, state, { sidebarIsExpanded: false });
    case ActionTypes.EXPAND_SIDEBAR:
      return Object.assign({}, state, { sidebarIsExpanded: true });
    case ActionTypes.COLLAPSE_CONSOLE:
      return Object.assign({}, state, { consoleIsExpanded: false });
    case ActionTypes.EXPAND_CONSOLE:
      return Object.assign({}, state, { consoleIsExpanded: true });
    case ActionTypes.OPEN_PREFERENCES:
      return Object.assign({}, state, { preferencesIsVisible: true });
    case ActionTypes.CLOSE_PREFERENCES:
      return Object.assign({}, state, { preferencesIsVisible: false });
    case ActionTypes.RESET_PROJECT:
      return initialState;
    case ActionTypes.OPEN_PROJECT_OPTIONS:
      return Object.assign({}, state, { projectOptionsVisible: true });
    case ActionTypes.CLOSE_PROJECT_OPTIONS:
      return Object.assign({}, state, { projectOptionsVisible: false });
    case ActionTypes.SHOW_NEW_FOLDER_MODAL:
      return Object.assign({}, state, {
        newFolderModalVisible: true,
        parentId: action.parentId,
        modalIsVisible: false
      });
    case ActionTypes.CLOSE_NEW_FOLDER_MODAL:
      return Object.assign({}, state, { newFolderModalVisible: false });
    case ActionTypes.SHOW_EDITOR_OPTIONS:
      return Object.assign({}, state, { editorOptionsVisible: true });
    case ActionTypes.CLOSE_EDITOR_OPTIONS:
      return Object.assign({}, state, { editorOptionsVisible: false });
    case ActionTypes.SHOW_KEYBOARD_SHORTCUT_MODAL:
      return Object.assign({}, state, { keyboardShortcutVisible: true });
    case ActionTypes.CLOSE_KEYBOARD_SHORTCUT_MODAL:
      return Object.assign({}, state, { keyboardShortcutVisible: false });
    case ActionTypes.SET_UNSAVED_CHANGES:
      return Object.assign({}, state, { unsavedChanges: action.value });
    case ActionTypes.DETECT_INFINITE_LOOPS:
      return Object.assign({}, state, { infiniteLoop: true, infiniteLoopMessage: action.message });
    case ActionTypes.RESET_INFINITE_LOOPS:
      return Object.assign({}, state, { infiniteLoop: false, infiniteLoopMessage: '' });
    case ActionTypes.START_SKETCH_REFRESH:
      return Object.assign({}, state, { previewIsRefreshing: true, isAutoRefresh: false });
    case ActionTypes.START_SKETCH_AUTO_REFRESH:
      return Object.assign({}, state, { previewIsRefreshing: true, isAutoRefresh: true });
    case ActionTypes.END_SKETCH_REFRESH:
      return Object.assign({}, state, { previewIsRefreshing: false });
    case ActionTypes.JUST_OPENED_PROJECT:
      return Object.assign({}, state, { justOpenedProject: true });
    case ActionTypes.RESET_JUST_OPENED_PROJECT:
      return Object.assign({}, state, { justOpenedProject: false });
    case ActionTypes.SET_PREVIOUS_PATH:
      return Object.assign({}, state, { previousPath: action.path });
    case ActionTypes.SHOW_ERROR_MODAL:
      return Object.assign({}, state, { errorType: action.modalType });
    case ActionTypes.HIDE_ERROR_MODAL:
      return Object.assign({}, state, { errorType: undefined });
    case ActionTypes.SHOW_RUNTIME_ERROR_WARNING:
      return Object.assign({}, state, { runtimeErrorWarningVisible: true });
    case ActionTypes.OPEN_UPLOAD_FILE_MODAL:
      return Object.assign({}, state, { uploadFileModalVisible: true, parentId: action.parentId });
    case ActionTypes.SET_PARENT_ID:
      return Object.assign({}, state, { parentId: action.parentId });
    case ActionTypes.CLOSE_UPLOAD_FILE_MODAL:
      return Object.assign({}, state, { uploadFileModalVisible: false });
    case ActionTypes.OPEN_SUBMIT_MODEL:
      return Object.assign({}, state, { submitModalVisible: true });
    case ActionTypes.OPEN_SHAPE_TOOLBOX:
      return Object.assign({}, state, {
        showingShapeToolbox: true,
        shapeToolboxCodeLoc: action.loc,
        shapeToolboxExistingCalls: action.existingCalls
      });
    case ActionTypes.CLOSE_SHAPE_TOOLBOX:
      return Object.assign({}, state, {
        showingShapeToolbox: false,
        shapeToolboxCodeLoc: null,
        shapeToolboxExistingCalls: []
      });
    case ActionTypes.CLOSE_SUBMIT_MODEL:
      return Object.assign({}, state, { submitModalVisible: false });
    case ActionTypes.SET_STALE:
      return Object.assign({}, state, { isStale: true });
    case ActionTypes.SET_NOT_STALE:
      return Object.assign({}, state, { isStale: false });
    case ActionTypes.SET_SHOWING:
      return Object.assign({}, state, { isShowing: true });
    default:
      return state;
  }
};

export default ide;
