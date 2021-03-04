import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { JSONUncrush } from 'jsoncrush';
import { browserHistory } from 'react-router';
import { updateFileContent } from '../modules/IDE/actions/files';

function LoadInitialCodeRedirect({ store, code }) {
  if (code) {
    useEffect(() => {
      const decodedCode = JSONUncrush(code);
      const scriptFile = store.getState().files.find((file) => file.name === 'sketch.js');

      // cool gotcha: the initial state for the project doesn't include any files, so trying to
      // run saveProject with specific code (and thus setting `fileSelected` to not equal null) throws
      // this does not work: saveProject(decodedCode)
      store.dispatch(updateFileContent(scriptFile.id, decodedCode));
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
