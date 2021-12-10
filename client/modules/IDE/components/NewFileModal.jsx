import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import NewFileForm from './NewFileForm';
import { closeNewFileModal } from '../actions/ide';
import ExitIcon from '../../../images/exit.svg';

// At some point this will probably be generalized to a generic modal
// in which you can insert different content
// but for now, let's just make this work
function NewFileModal(props) {
  const newFileModalRef = useRef(null);

  function handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (e.path.includes(newFileModalRef.current)) {
      return;
    }

    props.closeNewFileModal();
  }

  useEffect(() => {
    if (newFileModalRef) {
      console.log(newFileModalRef);
      newFileModalRef.current.focus();
    }
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 100);
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, []);
  return (
    <section className="modal" ref={newFileModalRef}>
      <div className="modal-content">
        <div className="modal__header">
          <h2 className="modal__title">{props.t('NewFileModal.Title')}</h2>
          <button
            className="modal__exit-button"
            onClick={props.closeNewFileModal}
            aria-label={props.t('NewFileModal.CloseButtonARIA')}
          >
            <ExitIcon focusable="false" aria-hidden="true" />
          </button>
        </div>
        <NewFileForm />
      </div>
    </section>
  );
}

NewFileModal.propTypes = {
  closeNewFileModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeNewFileModal }, dispatch);
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(NewFileModal));
