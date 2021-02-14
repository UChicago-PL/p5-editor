import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import * as IDEActions from '../actions/ide';
import * as preferenceActions from '../actions/preferences';
import * as projectActions from '../actions/project';

import PlayIcon from '../../../images/play.svg';
import StopIcon from '../../../images/stop.svg';
import PreferencesIcon from '../../../images/preferences.svg';
import EditProjectNameIcon from '../../../images/pencil.svg';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectNameSave = this.handleProjectNameSave.bind(this);

    this.state = {
      projectNameInputValue: props.project.name
    };
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.hideEditProjectName();
      this.projectNameInput.blur();
    }
  }

  handleProjectNameChange(event) {
    this.setState({ projectNameInputValue: event.target.value });
  }

  handleProjectNameSave() {
    const newProjectName = this.state.projectNameInputValue.trim();
    if (newProjectName.length === 0) {
      this.setState({
        projectNameInputValue: this.props.project.name
      });
    } else {
      this.props.setProjectName(newProjectName);
      this.props.hideEditProjectName();
      if (this.props.project.id) {
        this.props.saveProject();
      }
    }
  }

  handleSave() {
    this.props.saveProject(this.props.cmController.getContent());
  }

  canEditProjectName() {
    return (
      (this.props.owner &&
        this.props.owner.username &&
        this.props.owner.username === this.props.currentUser) ||
      !this.props.owner ||
      !this.props.owner.username
    );
  }

  render() {
    const playButtonClass = classNames({
      'toolbar__play-button': true,
      'toolbar__play-button--selected': this.props.isPlaying
    });
    const stopButtonClass = classNames({
      'toolbar__stop-button': true,
      'toolbar__stop-button--selected': !this.props.isPlaying
    });
    const preferencesButtonClass = classNames({
      'toolbar__preferences-button': true,
      'toolbar__preferences-button--selected': this.props.preferencesIsVisible
    });
    const nameContainerClass = classNames({
      'toolbar__project-name-container': true,
      'toolbar__project-name-container--editing': this.props.project.isEditingName
    });

    const canEditProjectName = this.canEditProjectName();

    return (
      <div className="toolbar">
        <div className="flex h-center">
          <button
            className="toolbar__play-sketch-button"
            onClick={() => {
              this.props.startAccessibleSketch();
              this.props.setTextOutput(true);
              this.props.setGridOutput(true);
            }}
            aria-label={this.props.t('Toolbar.PlaySketchARIA')}
            disabled={this.props.infiniteLoop}
          >
            <PlayIcon focusable="false" aria-hidden="true" />
          </button>
          <button
            className={playButtonClass}
            onClick={this.props.startSketch}
            aria-label={this.props.t('Toolbar.PlayOnlyVisualSketchARIA')}
            disabled={this.props.infiniteLoop}
          >
            <PlayIcon focusable="false" aria-hidden="true" />
          </button>
          <button
            className={stopButtonClass}
            onClick={this.props.stopSketch}
            aria-label={this.props.t('Toolbar.StopSketchARIA')}
          >
            <StopIcon focusable="false" aria-hidden="true" />
          </button>
          <div className="toolbar__autorefresh">
            <input
              id="autorefresh"
              className="checkbox__autorefresh"
              type="checkbox"
              checked={this.props.autorefresh}
              onChange={(event) => {
                this.props.setAutorefresh(event.target.checked);
              }}
            />
            <label htmlFor="autorefresh" className="toolbar__autorefresh-label">
              {this.props.t('Toolbar.Auto-refresh')}
            </label>
          </div>
          <div className={`${nameContainerClass} flex-down`}>
            <div className="flex">
              <div className="flex-down">
                <span className="toolbar__project-name__label">Sketch name</span>
                <button
                  className="toolbar__project-name"
                  onClick={() => {
                    if (canEditProjectName) {
                      this.props.showEditProjectName();
                      setTimeout(() => this.projectNameInput.focus(), 0);
                    }
                  }}
                  disabled={!canEditProjectName}
                  aria-label={this.props.t('Toolbar.EditSketchARIA')}
                >
                  <span>{this.props.project.name}</span>
                  {canEditProjectName && (
                    <EditProjectNameIcon
                      className="toolbar__edit-name-button"
                      focusable="false"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <input
                  type="text"
                  maxLength="128"
                  className="toolbar__project-name-input"
                  aria-label={this.props.t('Toolbar.NewSketchNameARIA')}
                  value={this.state.projectNameInputValue}
                  onChange={this.handleProjectNameChange}
                  ref={(element) => {
                    this.projectNameInput = element;
                  }}
                  onBlur={this.handleProjectNameSave}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
              {this.props.owner && (
                <div className="toolbar__project-owner flex-down">
                  <span className="toolbar__project-name__label">By User</span>
                  <div className="toolbar__project-name" style={{ paddingLeft: '6px', height: '20px' }}>
                    <Link to={`/${this.props.owner.username}/sketches`}>{this.props.owner.username}</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="submit-assignment-button"
            onClick={() => {
              this.handleSave();
              this.props.openSubmitModal();
            }}
          >
            SUBMIT
          </button>
          <button
            className={preferencesButtonClass}
            onClick={this.props.openPreferences}
            aria-label={this.props.t('Toolbar.OpenPreferencesARIA')}
          >
            <PreferencesIcon focusable="false" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  autorefresh: PropTypes.bool.isRequired,
  cmController: PropTypes.shape({
    findNext: PropTypes.func,
    findPrev: PropTypes.func,
    getContent: PropTypes.func,
    showFind: PropTypes.func,
    showReplace: PropTypes.func,
    tidyCode: PropTypes.func
  }),
  currentUser: PropTypes.string,
  hideEditProjectName: PropTypes.func.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  openPreferences: PropTypes.func.isRequired,
  openSubmitModal: PropTypes.func.isRequired,
  owner: PropTypes.shape({ username: PropTypes.string }),
  preferencesIsVisible: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isEditingName: PropTypes.bool,
    id: PropTypes.string
  }).isRequired,
  saveProject: PropTypes.func.isRequired,
  setAutorefresh: PropTypes.func.isRequired,
  setGridOutput: PropTypes.func.isRequired,
  setProjectName: PropTypes.func.isRequired,
  setTextOutput: PropTypes.func.isRequired,
  showEditProjectName: PropTypes.func.isRequired,
  startAccessibleSketch: PropTypes.func.isRequired,
  startSketch: PropTypes.func.isRequired,
  stopSketch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    username: PropTypes.string,
    id: PropTypes.string
  }).isRequired
};

Toolbar.defaultProps = {
  owner: undefined,
  currentUser: undefined,
  cmController: {}
};

function mapStateToProps(state) {
  return {
    autorefresh: state.preferences.autorefresh,
    currentUser: state.user.username,
    infiniteLoop: state.ide.infiniteLoop,
    isPlaying: state.ide.isPlaying,
    owner: state.project.owner,
    preferencesIsVisible: state.ide.preferencesIsVisible,
    project: state.project,
    user: state.user
  };
}

const mapDispatchToProps = {
  ...IDEActions,
  ...preferenceActions,
  ...projectActions
};

export const ToolbarComponent = withTranslation()(Toolbar);
export default connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent);
