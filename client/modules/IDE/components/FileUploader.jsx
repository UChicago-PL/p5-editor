import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import Dropzone from 'dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as UploaderActions from '../actions/uploader';
import getConfig from '../../../utils/getConfig';
import { fileExtensionsAndMimeTypes } from '../../../../server/utils/fileUtils';

const s3Bucket = `https://s3-${getConfig('AWS_REGION')}.amazonaws.com/${getConfig('S3_BUCKET')}/`;

function FileUploader(props) {
  const uploadContainer = useRef(null);
  const [inError, setInError] = useState(false);
  useEffect(() => {
    const userId = props.project.owner ? props.project.owner.id : props.user.id;
    new Dropzone(uploadContainer.current, {
      url: s3Bucket,
      method: 'post',
      autoProcessQueue: true,
      clickable: true,
      maxFiles: 6,
      parallelUploads: 2,
      maxFilesize: 5, // in mb
      maxThumbnailFilesize: 8, // 8 mb
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      acceptedFiles: fileExtensionsAndMimeTypes,
      dictDefaultMessage: props.t('FileUploader.DictDefaultMessage'),
      accept: props.dropzoneAcceptCallback.bind(this, userId, (e) => setInError(e)),
      sending: props.dropzoneSendingCallback,
      complete: props.dropzoneCompleteCallback,
      error: (file, errorMessage) => {
        console.log(file);
        console.log(errorMessage);
      }
    });
    Dropzone.autoDiscover = false;
  }, []);

  return (
    <div ref={uploadContainer} id="uploader" className="uploader dropzone">
      {inError && <div>{inError}</div>}
    </div>
  );
}

FileUploader.propTypes = {
  dropzoneAcceptCallback: PropTypes.func.isRequired,
  dropzoneSendingCallback: PropTypes.func.isRequired,
  dropzoneCompleteCallback: PropTypes.func.isRequired,
  project: PropTypes.shape({
    owner: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  t: PropTypes.func.isRequired
};

FileUploader.defaultProps = {
  project: {
    id: undefined,
    owner: undefined
  },
  user: {
    id: undefined
  }
};

function mapStateToProps(state) {
  return {
    files: state.files,
    project: state.project,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UploaderActions, dispatch);
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(FileUploader));
