import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import SplitPane from 'react-split-pane';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';
import PreviewFrame from '../components/PreviewFrame';
import Toolbar from '../components/Toolbar';
import Preferences from '../components/Preferences/index';
import NewFileModal from '../components/NewFileModal';
import NewFolderModal from '../components/NewFolderModal';
import UploadFileModal from '../components/UploadFileModal';
import SubmitModal from '../components/SubmitModal';
import KeyboardShortcutModal from '../components/KeyboardShortcutModal';
import ErrorModal from '../components/ErrorModal';
import Nav from '../../../components/Nav';
import Console from '../components/Console';
import Toast from '../components/Toast';
import RequestLogin from '../components/RequestLogin';
import * as FileActions from '../actions/files';
import * as IDEActions from '../actions/ide';
import * as ProjectActions from '../actions/project';
import * as EditorAccessibilityActions from '../actions/editorAccessibility';
import * as PreferencesActions from '../actions/preferences';
import * as UserActions from '../../User/actions';
import * as ToastActions from '../actions/toast';
import * as ConsoleActions from '../actions/console';
import { getHTMLFile } from '../reducers/files';
import Overlay from '../../App/components/Overlay';
import About from '../components/About';
import AddToCollectionList from '../components/AddToCollectionList';
import Feedback from '../components/Feedback';
import { CollectionSearchbar } from '../components/Searchbar';
import { getIsUserOwner } from '../selectors/users';

import { trackEvent } from '../../../utils/analytics';

import { autosaveEvery } from '../../../constants';
import ShapeToolboxOverlay from '../components/ShapeToolboxOverlay';

import LinterError from '../../../images/linterError.svg';

function getTitle(props) {
  const { id } = props.project;
  return id ? `CS 111 Editor | ${props.project.name}` : 'CS 111 Editor';
}

function warnIfUnsavedChanges(props, nextLocation) {
  const toAuth =
    nextLocation &&
    nextLocation.action === 'PUSH' &&
    (nextLocation.pathname === '/login' || nextLocation.pathname === '/signup');
  const onAuth =
    nextLocation && (props.location.pathname === '/login' || props.location.pathname === '/signup');
  if (props.ide.unsavedChanges && !toAuth && !onAuth) {
    if (!window.confirm(props.t('Nav.WarningUnsavedChanges'))) {
      return false;
    }
    return true;
  }
  return true;
}

class IDEView extends React.Component {
  constructor(props) {
    super(props);
    this.handleGlobalKeydown = this.handleGlobalKeydown.bind(this);

    this.state = {
      consoleSize: props.ide.consoleIsExpanded ? 150 : 29,
      sidebarSize: props.ide.sidebarIsExpanded ? 160 : 20
    };
  }

  componentDidMount() {
    // If page doesn't reload after Sign In then we need
    // to force cleared state to be cleared
    this.props.clearPersistedState();

    this.props.stopSketch();
    if (this.props.params.project_id) {
      const { project_id: id, username } = this.props.params;
      if (id !== this.props.project.id) {
        this.props.getProject(id, username);
      }
    }

    this.isMac = navigator.userAgent.toLowerCase().indexOf('mac') !== -1;
    document.addEventListener('keydown', this.handleGlobalKeydown, false);

    this.props.router.setRouteLeaveHook(this.props.route, this.handleUnsavedChanges);

    // window.onbeforeunload = this.handleUnsavedChanges;
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    this.autosaveInterval = null;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.setPreviousPath(this.props.location.pathname);
    }

    if (this.props.ide.consoleIsExpanded !== nextProps.ide.consoleIsExpanded) {
      this.setState({
        consoleSize: nextProps.ide.consoleIsExpanded ? 150 : 29
      });
    }

    if (this.props.ide.sidebarIsExpanded !== nextProps.ide.sidebarIsExpanded) {
      this.setState({
        sidebarSize: nextProps.ide.sidebarIsExpanded ? 160 : 20
      });
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.params.project_id && !this.props.params.project_id) {
      if (nextProps.params.project_id !== nextProps.project.id) {
        this.props.getProject(nextProps.params.project_id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isUserOwner && this.props.project.id) {
      if (
        this.props.preferences.autosave &&
        this.props.ide.unsavedChanges &&
        !this.props.ide.justOpenedProject
      ) {
        if (
          this.props.selectedFile.name === prevProps.selectedFile.name &&
          this.props.selectedFile.content !== prevProps.selectedFile.content
        ) {
          if (this.autosaveInterval) {
            clearTimeout(this.autosaveInterval);
          }
          this.autosaveInterval = setTimeout(this.props.autosaveProject, autosaveEvery);
        }
      } else if (this.autosaveInterval && !this.props.preferences.autosave) {
        clearTimeout(this.autosaveInterval);
        this.autosaveInterval = null;
      }
    } else if (this.autosaveInterval) {
      clearTimeout(this.autosaveInterval);
      this.autosaveInterval = null;
    }

    if (this.props.route.path !== prevProps.route.path) {
      this.props.router.setRouteLeaveHook(this.props.route, () => warnIfUnsavedChanges(this.props));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKeydown, false);
    clearTimeout(this.autosaveInterval);
    this.autosaveInterval = null;
  }

  handleGlobalKeydown(e) {
    // 83 === s
    if (e.keyCode === 83 && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac))) {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.isUserOwner || (this.props.user.authenticated && !this.props.project.owner)) {
        this.props.saveProject(this.cmController.getContent());
      } else if (this.props.user.authenticated) {
        this.props.cloneProject();
      } else {
        this.props.showErrorModal('forceAuthentication');
      }
      // 13 === enter
    } else if (e.keyCode === 13 && e.shiftKey && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac))) {
      e.preventDefault();
      e.stopPropagation();
      trackEvent({ eventName: 'kbdStop' });
      this.props.stopSketch();
    } else if (e.keyCode === 13 && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac))) {
      e.preventDefault();
      e.stopPropagation();
      trackEvent({ eventName: 'kbdRun' });
      this.props.startSketch();
      // 50 === 2
    } else if (e.keyCode === 50 && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac)) && e.shiftKey) {
      e.preventDefault();
      this.props.setAllAccessibleOutput(false);
      // 49 === 1
    } else if (e.keyCode === 49 && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac)) && e.shiftKey) {
      e.preventDefault();
      this.props.setAllAccessibleOutput(true);
    } else if (e.keyCode === 66 && ((e.metaKey && this.isMac) || (e.ctrlKey && !this.isMac))) {
      e.preventDefault();
      if (!this.props.ide.sidebarIsExpanded) {
        this.props.expandSidebar();
      } else {
        this.props.collapseSidebar();
      }
    } else if (e.keyCode === 192 && e.ctrlKey) {
      e.preventDefault();
      if (this.props.ide.consoleIsExpanded) {
        this.props.collapseConsole();
      } else {
        this.props.expandConsole();
      }
    } else if (e.keyCode === 27) {
      if (this.props.ide.newFolderModalVisible) {
        this.props.closeNewFolderModal();
      } else if (this.props.ide.uploadFileModalVisible) {
        this.props.closeUploadFileModal();
      } else if (this.props.ide.modalIsVisible) {
        this.props.closeNewFileModal();
      } else if (this.props.ide.submitModalVisible) {
        this.props.closeSubmitModal();
      }
    }
  }

  handleUnsavedChanges = (nextLocation) => warnIfUnsavedChanges(this.props, nextLocation);

  handleBeforeUnload = (e) => {
    const confirmationMessage = this.props.t('Nav.WarningUnsavedChanges');
    if (this.props.ide.unsavedChanges) {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    }
    return null;
  };

  render() {
    const isStale = this.props.ide.isStale && this.props.ide.isShowing;
    return (
      <div className="ide">
        <Helmet>
          <title>{getTitle(this.props)}</title>
        </Helmet>
        {this.props.user.authenticated ? <div id="fine"></div> : <RequestLogin />}
        {this.props.toast.isVisible && <Toast />}
        <Nav warnIfUnsavedChanges={this.handleUnsavedChanges} cmController={this.cmController} />
        <Toolbar key={this.props.project.id} cmController={this.cmController} />
        {this.props.ide.preferencesIsVisible && (
          <Overlay
            title={this.props.t('Preferences.Settings')}
            ariaLabel={this.props.t('Preferences.Settings')}
            closeOverlay={this.props.closePreferences}
          >
            <Preferences
              autocloseBracketsQuotes={this.props.preferences.autocloseBracketsQuotes}
              autocomplete={this.props.preferences.autocomplete}
              autosave={this.props.preferences.autosave}
              fontSize={this.props.preferences.fontSize}
              gridOutput={this.props.preferences.gridOutput}
              lineNumbers={this.props.preferences.lineNumbers}
              linewrap={this.props.preferences.linewrap}
              lintWarning={this.props.preferences.lintWarning}
              setAutocloseBracketsQuotes={this.props.setAutocloseBracketsQuotes}
              setAutocomplete={this.props.setAutocomplete}
              setAutosave={this.props.setAutosave}
              setFontSize={this.props.setFontSize}
              setGridOutput={this.props.setGridOutput}
              setLineNumbers={this.props.setLineNumbers}
              setLinewrap={this.props.setLinewrap}
              setLintWarning={this.props.setLintWarning}
              setSoundOutput={this.props.setSoundOutput}
              setTextOutput={this.props.setTextOutput}
              setTheme={this.props.setTheme}
              soundOutput={this.props.preferences.soundOutput}
              textOutput={this.props.preferences.textOutput}
              theme={this.props.preferences.theme}
            />
          </Overlay>
        )}
        <main className="editor-preview-container">
          <SplitPane
            split="vertical"
            size={this.state.sidebarSize}
            onChange={(size) => this.setState({ sidebarSize: size })}
            onDragFinished={this._handleSidebarPaneOnDragFinished}
            allowResize={this.props.ide.sidebarIsExpanded}
            minSize={125}
          >
            <Sidebar
              files={this.props.files}
              setSelectedFile={this.props.setSelectedFile}
              newFile={this.props.newFile}
              isExpanded={this.props.ide.sidebarIsExpanded}
              deleteFile={this.props.deleteFile}
              updateFileName={this.props.updateFileName}
              projectOptionsVisible={this.props.ide.projectOptionsVisible}
              openProjectOptions={this.props.openProjectOptions}
              closeProjectOptions={this.props.closeProjectOptions}
              newFolder={this.props.newFolder}
              user={this.props.user}
              owner={this.props.project.owner}
              openUploadFileModal={this.props.openUploadFileModal}
              closeUploadFileModal={this.props.closeUploadFileModal}
            />
            <SplitPane
              split="vertical"
              defaultSize="50%"
              onChange={() => {
                this.overlay.style.display = 'block';
              }}
              onDragFinished={() => {
                this.overlay.style.display = 'none';
              }}
              resizerStyle={{
                borderLeftWidth: '2px',
                borderRightWidth: '2px',
                width: '2px',
                margin: '0px 0px'
              }}
            >
              <SplitPane
                split="horizontal"
                primary="second"
                size={this.state.consoleSize}
                minSize={29}
                onChange={(size) => this.setState({ consoleSize: size })}
                allowResize={this.props.ide.consoleIsExpanded}
                className="editor-preview-subpanel"
              >
                <div className={this.props.ide.showingShapeToolbox ? 'showing-shape-toolbox' : ''}>
                  {this.props.ide.showingShapeToolbox && <div className="editor-block" />}
                  <Editor
                    provideController={(ctl) => {
                      this.cmController = ctl;
                    }}
                  />
                </div>
                <Console />
              </SplitPane>
              <section className="preview-frame-holder">
                <header className="preview-frame__header">
                  {isStale && <LinterError />}
                  <h2 className={'preview-frame__title' + (isStale ? ' stale' : '')}>
                    Canvas {isStale && '(Lint error is blocking refresh)'}
                  </h2>
                </header>
                <div className="preview-frame__content">
                  <div
                    className="preview-frame-overlay"
                    ref={(element) => {
                      this.overlay = element;
                    }}
                  />
                  <div>
                    {((this.props.preferences.textOutput ||
                      this.props.preferences.gridOutput ||
                      this.props.preferences.soundOutput) &&
                      this.props.ide.isPlaying) ||
                      this.props.ide.isAccessibleOutputPlaying}
                  </div>
                  <PreviewFrame cmController={this.cmController} />
                  {this.props.ide.showingShapeToolbox && (
                    <ShapeToolboxOverlay
                      closeCb={(lines) => this.props.closeShapeToolbox(lines)}
                      canvasSize={this.props.canvasSize}
                      existingCalls={this.props.ide.shapeToolboxExistingCalls}
                    />
                  )}
                </div>
              </section>
            </SplitPane>
          </SplitPane>
        </main>
        {this.props.ide.modalIsVisible && <NewFileModal />}
        {this.props.ide.newFolderModalVisible && (
          <NewFolderModal
            closeModal={this.props.closeNewFolderModal}
            createFolder={this.props.createFolder}
          />
        )}
        {this.props.ide.submitModalVisible && <SubmitModal />}
        {this.props.ide.uploadFileModalVisible && (
          <UploadFileModal closeModal={this.props.closeUploadFileModal} />
        )}
        {this.props.location.pathname === '/about' && (
          <Overlay
            title={this.props.t('About.Title')}
            previousPath={this.props.ide.previousPath}
            ariaLabel={this.props.t('About.Title')}
          >
            <About previousPath={this.props.ide.previousPath} />
          </Overlay>
        )}
        {this.props.location.pathname === '/feedback' && (
          <Overlay
            title={this.props.t('IDEView.SubmitFeedback')}
            previousPath={this.props.ide.previousPath}
            ariaLabel={this.props.t('IDEView.SubmitFeedbackARIA')}
          >
            <Feedback previousPath={this.props.ide.previousPath} />
          </Overlay>
        )}
        {this.props.location.pathname.match(/add-to-collection$/) && (
          <Overlay
            ariaLabel={this.props.t('IDEView.AddCollectionARIA')}
            title={this.props.t('IDEView.AddCollectionTitle')}
            previousPath={this.props.ide.previousPath}
            actions={<CollectionSearchbar />}
            isFixedHeight
          >
            <AddToCollectionList
              projectId={this.props.params.project_id}
              username={this.props.params.username}
              user={this.props.user}
            />
          </Overlay>
        )}
        {this.props.ide.keyboardShortcutVisible && (
          <Overlay
            title={this.props.t('KeyboardShortcuts.Title')}
            ariaLabel={this.props.t('KeyboardShortcuts.Title')}
            closeOverlay={this.props.closeKeyboardShortcutModal}
          >
            <KeyboardShortcutModal />
          </Overlay>
        )}
        {this.props.ide.errorType && (
          <Overlay
            title={this.props.t('Common.Error')}
            ariaLabel={this.props.t('Common.ErrorARIA')}
            closeOverlay={this.props.hideErrorModal}
          >
            <ErrorModal type={this.props.ide.errorType} closeModal={this.props.hideErrorModal} />
          </Overlay>
        )}
      </div>
    );
  }
}

IDEView.propTypes = {
  autosaveProject: PropTypes.func.isRequired,
  clearPersistedState: PropTypes.func.isRequired,
  cloneProject: PropTypes.func.isRequired,
  closeKeyboardShortcutModal: PropTypes.func.isRequired,
  closeNewFileModal: PropTypes.func.isRequired,
  closeNewFolderModal: PropTypes.func.isRequired,
  closePreferences: PropTypes.func.isRequired,
  closeProjectOptions: PropTypes.func.isRequired,
  closeSubmitModal: PropTypes.func.isRequired,
  closeUploadFileModal: PropTypes.func.isRequired,
  collapseConsole: PropTypes.func.isRequired,
  collapseSidebar: PropTypes.func.isRequired,
  createFolder: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  editorAccessibility: PropTypes.shape({ lintMessages: PropTypes.objectOf(PropTypes.shape()).isRequired })
    .isRequired,
  expandConsole: PropTypes.func.isRequired,
  expandSidebar: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  getProject: PropTypes.func.isRequired,
  hideErrorModal: PropTypes.func.isRequired,
  htmlFile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired,
  ide: PropTypes.shape({
    consoleIsExpanded: PropTypes.bool.isRequired,
    errorType: PropTypes.string,
    isStale: PropTypes.bool.isRequired,
    isShowing: PropTypes.bool.isRequired,
    isAccessibleOutputPlaying: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    justOpenedProject: PropTypes.bool.isRequired,
    keyboardShortcutVisible: PropTypes.bool.isRequired,
    modalIsVisible: PropTypes.bool.isRequired,
    newFolderModalVisible: PropTypes.bool.isRequired,
    preferencesIsVisible: PropTypes.bool.isRequired,
    previewIsRefreshing: PropTypes.bool.isRequired,
    previousPath: PropTypes.string.isRequired,
    projectOptionsVisible: PropTypes.bool.isRequired,
    sidebarIsExpanded: PropTypes.bool.isRequired,
    submitModalVisible: PropTypes.bool.isRequired,
    unsavedChanges: PropTypes.bool.isRequired,
    uploadFileModalVisible: PropTypes.bool.isRequired,
    showingShapeToolbox: PropTypes.bool.isRequired,
    shapeToolboxExistingCalls: PropTypes.arrayOf(PropTypes.any).isRequired
  }).isRequired,
  isUserOwner: PropTypes.bool.isRequired,
  canvasSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  newFile: PropTypes.func.isRequired,
  newFolder: PropTypes.func.isRequired,
  openProjectOptions: PropTypes.func.isRequired,
  openUploadFileModal: PropTypes.func.isRequired,
  params: PropTypes.shape({
    project_id: PropTypes.string,
    username: PropTypes.string,
    reset_password_token: PropTypes.string
  }).isRequired,
  preferences: PropTypes.shape({
    autocloseBracketsQuotes: PropTypes.bool.isRequired,
    autorefresh: PropTypes.bool.isRequired,
    autocomplete: PropTypes.bool.isRequired,
    autosave: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    gridOutput: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    lineNumbers: PropTypes.bool.isRequired,
    linewrap: PropTypes.bool.isRequired,
    lintWarning: PropTypes.bool.isRequired,
    soundOutput: PropTypes.bool.isRequired,
    textOutput: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired
  }).isRequired,
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    owner: PropTypes.shape({ id: PropTypes.string, username: PropTypes.string }),
    updatedAt: PropTypes.string
  }).isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.element]).isRequired,
  router: PropTypes.shape({ setRouteLeaveHook: PropTypes.func }).isRequired,
  saveProject: PropTypes.func.isRequired,
  selectedFile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  setAllAccessibleOutput: PropTypes.func.isRequired,
  setAutocloseBracketsQuotes: PropTypes.func.isRequired,
  setAutocomplete: PropTypes.func.isRequired,
  setAutosave: PropTypes.func.isRequired,
  setFontSize: PropTypes.func.isRequired,
  setGridOutput: PropTypes.func.isRequired,
  setLineNumbers: PropTypes.func.isRequired,
  setLinewrap: PropTypes.func.isRequired,
  setLintWarning: PropTypes.func.isRequired,
  setPreviousPath: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  setSoundOutput: PropTypes.func.isRequired,
  setTextOutput: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  showErrorModal: PropTypes.func.isRequired,
  startSketch: PropTypes.func.isRequired,
  stopSketch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toast: PropTypes.shape({ isVisible: PropTypes.bool.isRequired }).isRequired,
  updateFileName: PropTypes.func.isRequired,
  user: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    id: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  closeShapeToolbox: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    files: state.files,
    selectedFile:
      state.files.find((file) => file.isSelectedFile) ||
      state.files.find((file) => file.name === 'sketch.js') ||
      state.files.find((file) => file.name !== 'root'),
    htmlFile: getHTMLFile(state.files),
    ide: state.ide,
    preferences: state.preferences,
    editorAccessibility: state.editorAccessibility,
    user: state.user,
    project: state.project,
    toast: state.toast,
    console: state.console,
    isUserOwner: getIsUserOwner(state),
    canvasSize: IDEActions.getCanvasSize(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      EditorAccessibilityActions,
      FileActions,
      ProjectActions,
      IDEActions,
      PreferencesActions,
      UserActions,
      ToastActions,
      ConsoleActions
    ),
    dispatch
  );
}

export default withTranslation()(withRouter(connect(mapStateToProps, mapDispatchToProps)(IDEView)));
