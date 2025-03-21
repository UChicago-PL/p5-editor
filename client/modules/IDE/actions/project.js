import { browserHistory } from 'react-router';
import objectID from 'bson-objectid';
import each from 'async/each';
import isEqual from 'lodash/isEqual';
import { zip } from 'lodash';
import apiClient from '../../../utils/apiClient';
import getConfig from '../../../utils/getConfig';
import * as ActionTypes from '../../../constants';
import { showToast, setToastText } from './toast';
import {
  setUnsavedChanges,
  justOpenedProject,
  resetJustOpenedProject,
  showErrorModal,
  setPreviousPath
} from './ide';
import { clearState, saveState } from '../../../persistState';
import { trackEvent } from '../../../utils/analytics';

const ROOT_URL = getConfig('API_URL');
const S3_BUCKET_URL_BASE = getConfig('S3_BUCKET_URL_BASE');
const S3_BUCKET = getConfig('S3_BUCKET');

export function setProject(project) {
  return {
    type: ActionTypes.SET_PROJECT,
    project,
    files: project.files,
    owner: project.user
  };
}

export function setProjectName(name) {
  return {
    type: ActionTypes.SET_PROJECT_NAME,
    name
  };
}

export function projectSaveFail(error) {
  return {
    type: ActionTypes.PROJECT_SAVE_FAIL,
    error
  };
}

export function setNewProject(project) {
  return {
    type: ActionTypes.NEW_PROJECT,
    project,
    owner: project.user,
    files: project.files
  };
}

export function getProject(id, username) {
  return (dispatch) => {
    dispatch(justOpenedProject());
    apiClient
      .get(`/${username}/projects/${id}`)
      .then((response) => {
        dispatch(setProject(response.data));
        dispatch(setUnsavedChanges(false));
      })
      .catch((error) => {
        const { response } = error;
        dispatch({
          type: ActionTypes.ERROR,
          error: response.data
        });
      });
  };
}

export function persistState() {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.PERSIST_STATE
    });
    const state = getState();
    saveState(state);
  };
}

export function clearPersistedState() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLEAR_PERSISTED_STATE
    });
    clearState();
  };
}

export function startSavingProject() {
  return {
    type: ActionTypes.START_SAVING_PROJECT
  };
}

export function endSavingProject() {
  return {
    type: ActionTypes.END_SAVING_PROJECT
  };
}

export function projectSaveSuccess() {
  return {
    type: ActionTypes.PROJECT_SAVE_SUCCESS
  };
}

// want a function that will check for changes on the front end
function getSynchedProject(currentState, responseProject) {
  let hasChanges = false;
  const synchedProject = Object.assign({}, responseProject);
  const currentFiles = currentState.files.map(({ name, children, content }) => ({ name, children, content }));
  const responseFiles = responseProject.files.map(({ name, children, content }) => ({
    name,
    children,
    content
  }));
  if (!isEqual(currentFiles, responseFiles)) {
    synchedProject.files = currentState.files;
    hasChanges = true;
  }
  if (currentState.project.name !== responseProject.name) {
    synchedProject.name = currentState.project.name;
    hasChanges = true;
  }
  return {
    synchedProject,
    hasChanges
  };
}

// If the user is authenticated, run the callback with normal thunk parameters
// Otherwise show an error dialogue
export function checkLoggedIn(cb) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.user.authenticated) {
      dispatch(showErrorModal('forceAuthentication'));
    } else {
      cb(dispatch, getState);
    }
  };
}

export function saveProject(selectedFile = null, autosave = false) {
  trackEvent({ eventName: 'saveProject' });
  return checkLoggedIn((dispatch, getState) => {
    const state = getState();
    if (state.project.isSaving) {
      return Promise.resolve();
    }
    dispatch(startSavingProject());
    if (state.user.id && state.project.owner && state.project.owner.id !== state.user.id) {
      return Promise.reject();
    }
    const formParams = Object.assign({}, state.project);
    formParams.files = [...state.files];

    if (selectedFile) {
      const fileToUpdate = formParams.files.find((file) => file.id === selectedFile.id);
      fileToUpdate.content = selectedFile.content;
    }
    if (state.project.id) {
      return apiClient
        .put(`/projects/${state.project.id}`, formParams)
        .then((response) => {
          dispatch(endSavingProject());
          dispatch(setUnsavedChanges(false));
          const { hasChanges, synchedProject } = getSynchedProject(getState(), response.data);
          if (hasChanges) {
            dispatch(setUnsavedChanges(true));
          }
          dispatch(setProject(synchedProject));
          dispatch(projectSaveSuccess());
          if (!autosave) {
            if (state.ide.justOpenedProject && state.preferences.autosave) {
              dispatch(showToast(5500));
              dispatch(setToastText('Toast.SketchSaved'));
              setTimeout(() => dispatch(setToastText('Toast.AutosaveEnabled')), 1500);
              dispatch(resetJustOpenedProject());
            } else {
              dispatch(showToast(1500));
              dispatch(setToastText('Toast.SketchSaved'));
            }
          }
        })
        .catch((error) => {
          const { response } = error;
          dispatch(endSavingProject());
          dispatch(setToastText('Toast.SketchFailedSave'));
          dispatch(showToast(1500));
          if (response.status === 403) {
            dispatch(showErrorModal('staleSession'));
          } else if (response.status === 409) {
            dispatch(showErrorModal('staleProject'));
          } else {
            dispatch(projectSaveFail(response.data));
          }
        });
    }

    return apiClient
      .post('/projects', formParams)
      .then((response) => {
        dispatch(endSavingProject());
        const { hasChanges, synchedProject } = getSynchedProject(getState(), response.data);

        dispatch(setNewProject(synchedProject));
        dispatch(setUnsavedChanges(false));
        browserHistory.push(`/${response.data.user.username}/sketches/${response.data.id}`);

        if (hasChanges) {
          dispatch(setUnsavedChanges(true));
        }

        dispatch(projectSaveSuccess());
        if (!autosave) {
          if (state.preferences.autosave) {
            dispatch(showToast(5500));
            dispatch(setToastText('Toast.SketchSaved'));
            setTimeout(() => dispatch(setToastText('Toast.AutosaveEnabled')), 1500);
            dispatch(resetJustOpenedProject());
          } else {
            dispatch(showToast(1500));
            dispatch(setToastText('Toast.SketchSaved'));
          }
        }
      })
      .catch((error) => {
        const { response } = error;
        dispatch(endSavingProject());
        dispatch(setToastText('Toast.SketchFailedSave'));
        dispatch(showToast(1500));
        if (response.status === 403) {
          dispatch(showErrorModal('staleSession'));
        } else {
          dispatch(projectSaveFail(response.data));
        }
      });
  });
}

export function autosaveProject(mobile = false) {
  return (dispatch, getState) => {
    saveProject(null, true, mobile)(dispatch, getState);
  };
}

export function exportProjectAsZip(projectId) {
  const win = window.open(`${ROOT_URL}/projects/${projectId}/zip`, '_blank');
  win.focus();
}

export function resetProject() {
  return {
    type: ActionTypes.RESET_PROJECT
  };
}

export function newProject() {
  setTimeout(() => {
    browserHistory.push('/');
  }, 0);
  return resetProject();
}

function generateNewIdsForChildren(file, files) {
  const newChildren = [];
  file.children.forEach((childId) => {
    const child = files.find((childFile) => childFile.id === childId);
    const newId = objectID().toHexString();
    child.id = newId;
    child._id = newId;
    newChildren.push(newId);
    generateNewIdsForChildren(child, files);
  });
  file.children = newChildren; // eslint-disable-line
}

export function cloneProject(project) {
  return (dispatch, getState) => {
    dispatch(setUnsavedChanges(false));
    const state = getState();
    const files = project ? project.files : state.files;
    const projectName = project ? project.name : state.project.name;
    const newFiles = files.map((file) => ({ ...file }));

    // generate new IDS for all files
    const rootFile = newFiles.find((file) => file.name === 'root');
    const newRootFileId = objectID().toHexString();
    rootFile.id = newRootFileId;
    rootFile._id = newRootFileId;
    generateNewIdsForChildren(rootFile, newFiles);

    // duplicate all files hosted on S3
    each(
      newFiles,
      (file, callback) => {
        if (file.url && (file.url.includes(S3_BUCKET_URL_BASE) || file.url.includes(S3_BUCKET))) {
          const formParams = {
            url: file.url
          };
          apiClient.post('/S3/copy', formParams).then((response) => {
            file.url = response.data.url;
            callback(null);
          });
        } else {
          callback(null);
        }
      },
      () => {
        // if not errors in duplicating the files on S3, then duplicate it
        const formParams = Object.assign({}, { name: `${projectName} copy` }, { files: newFiles });
        apiClient
          .post('/projects', formParams)
          .then((response) => {
            browserHistory.push(`/${response.data.user.username}/sketches/${response.data.id}`);
            dispatch(setNewProject(response.data));
          })
          .catch((error) => {
            const { response } = error;
            dispatch({
              type: ActionTypes.PROJECT_SAVE_FAIL,
              error: response.data
            });
          });
      }
    );
  };
}

export function showEditProjectName() {
  return {
    type: ActionTypes.SHOW_EDIT_PROJECT_NAME
  };
}

export function hideEditProjectName() {
  return {
    type: ActionTypes.HIDE_EDIT_PROJECT_NAME
  };
}

export function setProjectSavedTime(updatedAt) {
  return {
    type: ActionTypes.SET_PROJECT_SAVED_TIME,
    value: updatedAt
  };
}

export function changeProjectName(id, newName) {
  return (dispatch, getState) => {
    const state = getState();
    apiClient
      .put(`/projects/${id}`, { name: newName })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.RENAME_PROJECT,
            payload: { id: response.data.id, name: response.data.name }
          });
          if (state.project.id === response.data.id) {
            dispatch({
              type: ActionTypes.SET_PROJECT_NAME,
              name: response.data.name
            });
          }
        }
      })
      .catch((error) => {
        const { response } = error;
        dispatch({
          type: ActionTypes.PROJECT_SAVE_FAIL,
          error: response.data
        });
      });
  };
}

export function deleteProject(id) {
  return (dispatch, getState) => {
    apiClient
      .delete(`/projects/${id}`)
      .then(() => {
        const state = getState();
        if (id === state.project.id) {
          dispatch(resetProject());
          dispatch(setPreviousPath('/'));
        }
        dispatch({
          type: ActionTypes.DELETE_PROJECT,
          id
        });
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 403) {
          dispatch(showErrorModal('staleSession'));
        } else {
          dispatch({
            type: ActionTypes.ERROR,
            error: response.data
          });
        }
      });
  };
}

// From WI22 (and possibly onwards) full snap shot logging is not required or allowed
const DISABLED = true;
export function logRun(type) {
  if (DISABLED) {
    return () => {};
  }
  const makeRequest = (projectId, logParams) => apiClient.post(`/projects/${projectId}/log`, logParams);

  const saveLog = (projectId, logParams) => {
    const offlineLogKey = `${projectId}-offline-logs`;

    makeRequest(projectId, logParams)
      .then(() => {
        // if the request succeeds, try saving the stored logs
        const offlineLogs = JSON.parse(localStorage.getItem(offlineLogKey)) || [];
        Promise.allSettled(offlineLogs.map((log) => makeRequest(projectId, log))).then((results) => {
          // filter out the logs whose save request did not go through
          const failedLogs = zip(offlineLogs, results)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([log, result]) => result.status === 'rejected')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([log, result]) => result);
          localStorage.setItem(offlineLogKey, JSON.stringify(failedLogs));
        });
      })
      .catch(() => {
        const offlineLogs = JSON.parse(localStorage.getItem(offlineLogKey)) || [];
        localStorage.setItem(offlineLogKey, JSON.stringify([...offlineLogs, logParams]));
      });
  };

  return (dispatch, getState) => {
    const state = getState();

    const logParams = {
      type,
      files: [...state.files],
      timestamp: Date.now()
    };

    if (state.project.id) {
      saveLog(state.project.id, logParams);
    } else {
      try {
        // in this case, saveProject will invoke the createProject function on the backend,
        // so a snapshot log won't be automatically created
        dispatch(saveProject()).then(() => {
          const newState = getState();
          saveLog(newState.project.id, logParams);
        });
      } catch (e) {
        // Sometimes there is a `then method not found error`
        // This is not worth looking into for now
      }
    }
  };
}
