import * as ActionTypes from '../../../constants';
import { clearConsole } from './console';

import { checkLoggedIn, logRun } from './project';
import { applyShapeToolbox, processExistingCode } from './shapeToolbox';

export function startVisualSketch() {
  return {
    type: ActionTypes.START_SKETCH
  };
}

export function stopVisualSketch() {
  return {
    type: ActionTypes.STOP_SKETCH
  };
}

export function endSketchRefresh() {
  return {
    type: ActionTypes.END_SKETCH_REFRESH
  };
}

export function startAccessibleOutput() {
  return {
    type: ActionTypes.START_ACCESSIBLE_OUTPUT
  };
}

export function stopAccessibleOutput() {
  return {
    type: ActionTypes.STOP_ACCESSIBLE_OUTPUT
  };
}

export function setSelectedFile(fileId) {
  return {
    type: ActionTypes.SET_SELECTED_FILE,
    selectedFile: fileId
  };
}

export function resetSelectedFile(previousId) {
  return (dispatch, getState) => {
    const state = getState();
    const newId = state.files.find((file) => file.name !== 'root' && file.id !== previousId).id;
    dispatch({
      type: ActionTypes.SET_SELECTED_FILE,
      selectedFile: newId
    });
  };
}

export function newFile(parentId) {
  return {
    type: ActionTypes.SHOW_MODAL,
    parentId
  };
}

export function closeNewFileModal() {
  return {
    type: ActionTypes.HIDE_MODAL
  };
}

export function openUploadFileModal(parentId) {
  return {
    type: ActionTypes.OPEN_UPLOAD_FILE_MODAL,
    parentId
  };
}

export function closeUploadFileModal() {
  return {
    type: ActionTypes.CLOSE_UPLOAD_FILE_MODAL
  };
}

export function setParentId(parentId) {
  return {
    type: ActionTypes.SET_PARENT_ID,
    parentId
  };
}

export function expandSidebar() {
  return {
    type: ActionTypes.EXPAND_SIDEBAR
  };
}

export function collapseSidebar() {
  return {
    type: ActionTypes.COLLAPSE_SIDEBAR
  };
}

export function expandConsole() {
  return {
    type: ActionTypes.EXPAND_CONSOLE
  };
}

export function collapseConsole() {
  return {
    type: ActionTypes.COLLAPSE_CONSOLE
  };
}

export function openPreferences() {
  return {
    type: ActionTypes.OPEN_PREFERENCES
  };
}

export function openSubmitModal() {
  return {
    type: ActionTypes.OPEN_SUBMIT_MODEL
  };
}

export function closeSubmitModal() {
  return {
    type: ActionTypes.CLOSE_SUBMIT_MODEL
  };
}

export function closePreferences() {
  return {
    type: ActionTypes.CLOSE_PREFERENCES
  };
}

export function openProjectOptions() {
  return {
    type: ActionTypes.OPEN_PROJECT_OPTIONS
  };
}

export function closeProjectOptions() {
  return {
    type: ActionTypes.CLOSE_PROJECT_OPTIONS
  };
}

export function newFolder(parentId) {
  return {
    type: ActionTypes.SHOW_NEW_FOLDER_MODAL,
    parentId
  };
}

export function closeNewFolderModal() {
  return {
    type: ActionTypes.CLOSE_NEW_FOLDER_MODAL
  };
}

export function showEditorOptions() {
  return {
    type: ActionTypes.SHOW_EDITOR_OPTIONS
  };
}

export function closeEditorOptions() {
  return {
    type: ActionTypes.CLOSE_EDITOR_OPTIONS
  };
}

export function showKeyboardShortcutModal() {
  return {
    type: ActionTypes.SHOW_KEYBOARD_SHORTCUT_MODAL
  };
}

export function closeKeyboardShortcutModal() {
  return {
    type: ActionTypes.CLOSE_KEYBOARD_SHORTCUT_MODAL
  };
}

export function setUnsavedChanges(value) {
  return {
    type: ActionTypes.SET_UNSAVED_CHANGES,
    value
  };
}

export function detectInfiniteLoops(message) {
  return {
    type: ActionTypes.DETECT_INFINITE_LOOPS,
    message
  };
}

export function resetInfiniteLoops() {
  return {
    type: ActionTypes.RESET_INFINITE_LOOPS
  };
}

export function justOpenedProject() {
  return {
    type: ActionTypes.JUST_OPENED_PROJECT
  };
}

export function resetJustOpenedProject() {
  return {
    type: ActionTypes.RESET_JUST_OPENED_PROJECT
  };
}

export function setPreviousPath(path) {
  return {
    type: ActionTypes.SET_PREVIOUS_PATH,
    path
  };
}

export function showErrorModal(modalType) {
  return {
    type: ActionTypes.SHOW_ERROR_MODAL,
    modalType
  };
}

export function hideErrorModal() {
  return {
    type: ActionTypes.HIDE_ERROR_MODAL
  };
}

export function showRuntimeErrorWarning() {
  return {
    type: ActionTypes.SHOW_RUNTIME_ERROR_WARNING
  };
}

export function startRefreshSketch() {
  return {
    type: ActionTypes.START_SKETCH_REFRESH
  };
}

export function startSketch() {
  return checkLoggedIn((dispatch, getState) => {
    if (!getState().project.id) {
      setTimeout(() => dispatch(startVisualSketch()), 1000);
    }
    dispatch(clearConsole());
    dispatch(startVisualSketch());
    dispatch(startRefreshSketch());
    dispatch(logRun('run-manual'));
  });
}

export function startAccessibleSketch() {
  return checkLoggedIn((dispatch) => {
    dispatch(clearConsole());
    dispatch(startAccessibleOutput());
    dispatch(startVisualSketch());
    dispatch(startRefreshSketch());
    dispatch(logRun('run-manual'));
  });
}

export function startAutoRefreshSketch() {
  return checkLoggedIn((dispatch) => {
    dispatch({
      type: ActionTypes.START_SKETCH_AUTO_REFRESH
    });
    dispatch(logRun('run-auto'));
  });
}

export function stopSketch() {
  return (dispatch) => {
    dispatch(stopAccessibleOutput());
    dispatch(stopVisualSketch());
  };
}

export function createError(error) {
  return {
    type: ActionTypes.ERROR,
    error
  };
}

export function openShapeToolbox(loc, startLine, existingCode) {
  return (dispatch) => {
    // As part of preventing editing while the toolbox is shown,
    // un-focus the editor so that typing isn't possible
    document.body.focus();
    const existingCalls = processExistingCode(existingCode, startLine, dispatch);
    if (existingCalls !== null) {
      dispatch({
        type: ActionTypes.OPEN_SHAPE_TOOLBOX,
        loc,
        existingCalls
      });
    }
  };
}

export function closeShapeToolbox(calls) {
  return (dispatch, getState) => {
    if (calls.length) {
      const state = getState();
      const file = state.files.find((f) => f.isSelectedFile);
      if (!file || file.name.split('.')[1] !== 'js') {
        throw new Error('Could not find active JS file');
      }
      if (!state.ide.shapeToolboxCodeLoc) {
        throw new Error('Could not find shape toolbox code location');
      }
      dispatch({
        type: ActionTypes.UPDATE_FILE_CONTENT,
        id: file.id,
        content: applyShapeToolbox(file.content, calls, state.ide.shapeToolboxCodeLoc)
      });
    }
    dispatch({
      type: ActionTypes.CLOSE_SHAPE_TOOLBOX
    });
    dispatch(startSketch());
  };
}

export function getCanvasSize(state) {
  const file = state.files.find((f) => f.isSelectedFile);
  if (file && file.name.split('.')[1] === 'js') {
    const match = file.content.match(/createCanvas\(\s*(?<width>\d+)\s*,\s*(?<height>\d+)\s*\)/);
    if (match && match.groups && match.groups.width && match.groups.height) {
      return { width: parseInt(match.groups.width), height: parseInt(match.groups.height) };
    }
  }
  return { width: 400, height: 400 };
}

export function setStale() {
  return {
    type: ActionTypes.SET_STALE
  };
}

export function setNotStale() {
  return {
    type: ActionTypes.SET_NOT_STALE
  };
}

export function setShowing() {
  return {
    type: ActionTypes.SET_SHOWING
  };
}
