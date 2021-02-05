import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as IDEActions from '../actions/ide';
import * as UserActions from '../../User/actions';
import SubmitForm from './SubmitForm';
import ExitIcon from '../../../images/exit.svg';

class SubmitalModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    this.SubmitalModal.focus();
    document.addEventListener('click', this.handleOutsideClick, false);
    // todo add a check to see if gh repos are already loaded, if they are then DONT call this function
    this.props.getGHRepos();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (e.path.includes(this.SubmitalModal)) return;

    this.props.closeSubmitModal();
  }

  // handleSave() {
  //   if (this.props.user.authenticated) {
  //     this.props.saveProject(this.props.cmController.getContent());
  //   } else {
  //     this.props.showErrorModal('forceAuthentication');
  //   }
  //   this.setDropdown('none');
  // }

  render() {
    const { repos, user, project } = this.props;
    const isAuthed = user.authenticated;
    return (
      <section
        className="modal"
        ref={(element) => {
          this.SubmitalModal = element;
        }}
      >
        <div className="modal-content">
          <div className="modal__header">
            <h2 className="modal__title">Submit current sketch</h2>
            <button
              className="modal__exit-button"
              onClick={this.props.closeSubmitModal}
              aria-label={this.props.t('SubmitalModal.CloseButtonARIA')}
            >
              <ExitIcon focusable="false" aria-hidden="true" />
            </button>
          </div>
          {isAuthed && <SubmitForm repos={repos} project={project} />}
          {!isAuthed && <div>You must be logged into to use this feature</div>}
        </div>
      </section>
    );
  }
}

SubmitalModal.propTypes = {
  closeSubmitModal: PropTypes.func.isRequired,
  getGHRepos: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  console.log(state);
  return {
    user: state.user,
    sorting: state.sorting,
    loading: state.loading,
    project: state.project,
    repos: state.repos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ProjectActions, IDEActions, UserActions), dispatch);
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SubmitalModal));
