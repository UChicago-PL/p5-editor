import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function EditorImagePreview(props) {
  console.log(props);
  const fileType = props.file.name.split('.').reverse()[0].toLowerCase();
  const isImg = new Set(['jpg', 'png', 'jpeg']).has(fileType);
  const classes = classNames({
    'editor-img-preview': true,
    'editor-img-preview--hidden': !isImg
  });

  return (
    <section className={classes}>
      {isImg && <img alt={`Preview of ${props.file.name}`} src={`${props.file.url}`} />}
    </section>
  );
}

EditorImagePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    file:
      state.files.find((file) => file.isSelectedFile) ||
      state.files.find((file) => file.name === 'sketch.js') ||
      state.files.find((file) => file.name !== 'root')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch);
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(EditorImagePreview));
