import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import NewFolderForm from './NewFolderForm';
import ExitIcon from '../../../images/exit.svg';

function NewFolderModal(props) {
  const newFolderModalRef = useRef(null);

  function handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (e.path.includes(newFolderModalRef.current)) {
      return;
    }

    props.closeModal();
  }

  useEffect(() => {
    if (newFolderModalRef) {
      console.log(newFolderModalRef);
      newFolderModalRef.current.focus();
    }
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 100);
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, []);
  return (
    <section className="modal" ref={newFolderModalRef}>
      <div className="modal-content-folder">
        <div className="modal__header">
          <h2 className="modal__title">{props.t('NewFolderModal.Title')}</h2>
          <button
            className="modal__exit-button"
            onClick={props.closeModal}
            aria-label={props.t('NewFolderModal.CloseButtonARIA')}
          >
            <ExitIcon focusable="false" aria-hidden="true" />
          </button>
        </div>
        <NewFolderForm />
      </div>
    </section>
  );
}

NewFolderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation()(NewFolderModal);
