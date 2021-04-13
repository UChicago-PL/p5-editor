import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { JSONUncrush } from 'jsoncrush';
import { browserHistory } from 'react-router';
import { updateFileContent, handleCreateFile, deleteFile } from '../modules/IDE/actions/files';
import { setParentId } from '../modules/IDE/actions/ide';
import { setProjectName } from '../modules/IDE/actions/project';

function computeFilesToDelete(oldFiles, newFiles) {
  const newFileNames = newFiles.reduce((acc, { name }) => acc.add(name), new Set());
  const filesToDelete = oldFiles.reduce(
    (acc, { name }) => (!newFileNames.has(name) ? acc.add(name) : acc),
    new Set([])
  );
  return Array.from(filesToDelete).filter((x) => x !== 'root');
}

function getParsedCode(code) {
  const decodedCode = JSONUncrush(code);
  // assume that code we've received is an object
  let parsedCode;
  try {
    // try to parse it
    parsedCode = JSON.parse(decodedCode);
  } catch (e) {
    // if it fails then we know it was a string most likely
    console.log('error', e);
    parsedCode = decodedCode;
  }
  return parsedCode;
}

function LoadInitialCodeRedirect({ store, code }) {
  useEffect(() => {
    if (!code) {
      browserHistory.replace('/');
    }
    const parsedCode = getParsedCode(code);
    if (!new Set(['string', 'object']).has(typeof parsedCode)) {
      console.error('invalid import', parsedCode);
      return;
    }

    // load a single file as a string
    if (typeof parsedCode === 'string') {
      const scriptFile = store.getState().files.find((file) => file.name === 'sketch.js');

      // cool gotcha: the initial state for the project doesn't include any files, so trying to
      // run saveProject with specific code (and thus setting `fileSelected` to not equal null) throws
      // this does not work: saveProject(parsedCode)
      store.dispatch(updateFileContent(scriptFile.id, parsedCode));
      return;
    }

    // load with object format
    const { files } = store.getState();
    const rootId = files.find((file) => file.name === 'root').id;
    store.dispatch(setParentId(rootId));

    // find all of the files with names like we expect, replace em
    // otherwise createFile at root
    parsedCode.files.forEach((newFile) => {
      const oldFile = files.find((file) => file.name === newFile.name);
      if (oldFile) {
        console.log('overwrote');
        store.dispatch(updateFileContent(oldFile.id, newFile.content));
      } else {
        const formParams = {
          name: newFile.name,
          content: newFile.content
        };
        store.dispatch(handleCreateFile(formParams));
      }
    });

    // delete files
    const filesToDelete = computeFilesToDelete(files, parsedCode.files);
    filesToDelete.forEach((fileName) => {
      const targetFile = files.find(({ name }) => name === fileName);
      store.dispatch(deleteFile(targetFile.id, rootId));
    });
    store.dispatch(setProjectName(parsedCode.projectName));
    browserHistory.replace('/');
  }, [code]);
  return (
    <div id="load-from-folder">
      <p>Loading...</p>
    </div>
  );
}

LoadInitialCodeRedirect.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired,
  code: PropTypes.string.isRequired
};

export default LoadInitialCodeRedirect;
