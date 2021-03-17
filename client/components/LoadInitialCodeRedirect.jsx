import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { JSONUncrush } from 'jsoncrush';
import { browserHistory } from 'react-router';
import { updateFileContent } from '../modules/IDE/actions/files';
import { setProjectName } from '../modules/IDE/actions/project';

function LoadInitialCodeRedirect({ store, code }) {
  if (code) {
    useEffect(() => {
      const decodedCode = JSONUncrush(code);
      let parsedCode;
      try {
        parsedCode = JSON.parse(decodedCode);
      } catch (e) {
        console.log('error', e);
        parsedCode = decodedCode;
      }
      if (typeof parsedCode === 'string') {
        const scriptFile = store.getState().files.find((file) => file.name === 'sketch.js');

        // cool gotcha: the initial state for the project doesn't include any files, so trying to
        // run saveProject with specific code (and thus setting `fileSelected` to not equal null) throws
        // this does not work: saveProject(parsedCode)
        store.dispatch(updateFileContent(scriptFile.id, parsedCode));
      }
      if (typeof parsedCode === 'object') {
        // find all of the files with names like we expect, replace em
        // otherwise createFile at root
        parsedCode.files.forEach((newFile) => {
          const oldFile = store.getState().files.find((file) => file.name === newFile.name);
          if (oldFile) {
            console.log('overwrote');
            store.dispatch(updateFileContent(oldFile.id, newFile.content));
          } else {
            // WIP - for now we can only import files with the standard naming convention
            // const rootId = store.getState().files.find((file) => file.name === 'root').id;
            // const preppedFile = {
            //   children: [],
            //   fileType: 'file',
            //   isSelectedFile: false,
            //   name: newFile.name,
            //   content: newFile.content,
            //   parentId: rootId
            // };
            // store.dispatch(createFile(preppedFile, rootId));
          }
        });
        store.dispatch(setProjectName(parsedCode.projectName));
      }

      browserHistory.replace('/');
    });
  } else {
    browserHistory.replace('/');
  }
  return <p>Loading...</p>;
}

LoadInitialCodeRedirect.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired,
  code: PropTypes.string.isRequired
};

export default LoadInitialCodeRedirect;
