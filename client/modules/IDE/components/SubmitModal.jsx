import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as IDEActions from '../actions/ide';
import * as UserActions from '../../User/actions';
import SubmitForm from './SubmitForm';
import ExitIcon from '../../../images/exit.svg';

function SubmitalModal(props) {
  const submitModal = useRef(null);

  function handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (e.path.includes(submitModal.current)) {
      return;
    }

    props.closeSubmitModal();
  }

  useEffect(() => {
    if (submitModal) {
      console.log(submitModal);
      submitModal.current.focus();
    }
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 100);
    props.getGHRepos();
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, []);
  const { repos, user, project, repoLoadState } = props;
  const isAuthed = user.authenticated;
  return (
    <section className="modal" ref={submitModal}>
      <div className="modal-content">
        <div className="modal__header">
          <h2 className="modal__title">Submit current sketch for which assignment?</h2>
          <button
            className="modal__exit-button"
            onClick={props.closeSubmitModal}
            aria-label={props.t('SubmitalModal.CloseButtonARIA')}
          >
            <ExitIcon focusable="false" aria-hidden="true" />
          </button>
        </div>
        {isAuthed && <SubmitForm repos={repos} project={project} />}
        {repoLoadState === 'loading' && <div>LOADING REPOS</div>}
        {repoLoadState === 'error' && <div>ERROR LOADING REPOS</div>}
        {!isAuthed && <div>You must be logged in to use this feature</div>}
      </div>
    </section>
  );
}

SubmitalModal.propTypes = {
  closeSubmitModal: PropTypes.func.isRequired,
  getGHRepos: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  repoLoadState: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    project: state.project,
    repos: state.repos.repos,
    repoLoadState: state.repos.loadState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ProjectActions, IDEActions, UserActions), dispatch);
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SubmitalModal));
