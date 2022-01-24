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
  const { repos, user, project, repoLoadState, owner } = props;
  const isAuthed = user.authenticated;
  const isOwnRepo = owner && user && user.username && owner.username && owner.username === user.username;

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
        {isAuthed && isOwnRepo && <SubmitForm repos={repos} project={project} />}
        {repoLoadState === 'loading' && <div>LOADING REPOS</div>}
        {repoLoadState === 'error' && <div>ERROR LOADING REPOS</div>}
        {!isAuthed && isOwnRepo && <div>You must be logged in to use this feature</div>}
        {!isOwnRepo && <div> Can not submit someone elses work</div>}
      </div>
    </section>
  );
}

SubmitalModal.propTypes = {
  closeSubmitModal: PropTypes.func.isRequired,
  getGHRepos: PropTypes.func.isRequired,
  owner: PropTypes.shape({ username: PropTypes.string }),
  project: PropTypes.shape({ name: PropTypes.string.isRequired, id: PropTypes.string.isRequired }).isRequired,
  repoLoadState: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({ username: PropTypes.string, authenticated: PropTypes.bool.isRequired }).isRequired
};

function mapStateToProps(state) {
  return {
    owner: state.project.owner,
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
