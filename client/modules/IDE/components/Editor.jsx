import PropTypes from 'prop-types';
import React from 'react';
import prettier from 'prettier/esm/standalone.mjs';
import parserBabel from 'prettier/esm/parser-babel.mjs';
import parserHtml from 'prettier/esm/parser-html.mjs';
import parserCSS from 'prettier/esm/parser-postcss.mjs';

import { withTranslation } from 'react-i18next';

import { JSHINT } from 'jshint';
import { CSSLint } from 'csslint';
import { HTMLHint } from 'htmlhint';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cmSearch from '@codemirror/search';
import { linter, lintGutter } from '@codemirror/lint';
import Timer from './Timer';
import EditorAccessibility from './EditorAccessibility';
import jshintRules from '../../../utils/jshintRules';

import { trackEvent } from '../../../utils/analytics.ts';

import UnsavedChangesDotIcon from '../../../images/unsaved-changes-dot.svg';
import RightArrowIcon from '../../../images/right-arrow.svg';
import LeftArrowIcon from '../../../images/left-arrow.svg';
import { getHTMLFile } from '../reducers/files';
import { getIsUserOwner } from '../selectors/users';

import { metaKey } from '../../../utils/metaKey';

import * as FileActions from '../actions/files';
import * as IDEActions from '../actions/ide';
import * as ProjectActions from '../actions/project';
import * as EditorAccessibilityActions from '../actions/editorAccessibility';
import * as PreferencesActions from '../actions/preferences';
import * as UserActions from '../../User/actions';
import * as ToastActions from '../actions/toast';
import * as ConsoleActions from '../actions/console';

import CodeMirror from './CodeMirror';
import { cmStatePlugin } from './CodeMirror/state/cmState';

import { p5FunctionKeywords, p5VariableKeywords } from '../../../utils/p5-keywords';

// const htmlHintConfig = {
//   'title-require': false,
//   'doctype-first': false,
//   'alt-require': false
// };

// const INDENTATION_AMOUNT = 2;
const prettierPlugins = [parserBabel, parserHtml, parserCSS];

const REFRESH_DELAY = 1000;

const KEYWORDS = {
  function: [...Object.keys(p5FunctionKeywords), 'Editor.shapeToolbox', 'Editor.slider'],
  variable: Object.keys(p5VariableKeywords)
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.tidyCode = this.tidyCode.bind(this);
    this.keyBindings = [
      {
        key: `${metaKey}-m`,
        run: () => {
          trackEvent({ eventName: 'tidyCode' });
          this.tidyCode();
          return true;
        },
        preventDefault: true
      },
      {
        key: `${metaKey}-Enter`,
        run: () => {
          return true;
        },
        preventDefault: true
      },
      // block the use of the linter pop up
      {
        key: `${metaKey}-Shift-m`,
        run: () => true,
        preventDefault: true
      },
      ...['Delete', 'Backspace'].map((key) => ({
        key,
        run: () => {
          return this.props.showingShapeToolbox;
        },
        preventDefault: true
      }))
    ];
    // keep track of when the code was tidied, to prevent invoking redundant refresh and log save
    // on the 'onChange' event of the code being tidied
    this.justTidied = false;
    this.lastChange = 0;
    this.cmView = null;
    this.lastWidgetChangeTime = 0;

    // this.updateLintingMessageAccessibility = debounce((annotations) => {
    //   this.props.clearLintMessage();
    //   annotations.forEach((x) => {
    //     if (x.from.line > -1) {
    //       this.props.updateLintMessage(x.severity, x.from.line + 1, x.message);
    //     }
    //   });
    //   if (this.props.lintMessages.length > 0 && this.props.lintWarning) {
    //     this.beep.play();
    //   }
    // }, 2000);
    this.showFind = this.showFind.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.getContent = this.getContent.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.provideController({
      tidyCode: this.tidyCode,
      showFind: this.showFind,
      findNext: this.findNext,
      findPrev: this.findPrev,
      getContent: this.getContent
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.file.content !== prevProps.file.content) {
      if (!prevProps.unsavedChanges) {
        setTimeout(() => this.props.setUnsavedChanges(false), 400);
      }
    }
  }

  componentWillUnmount() {
    this.props.provideController(null);
  }

  onChange(newCode) {
    this.props.updateFileContent(this.props.file.id, newCode);
    this.lastChange = Date.now();

    const cb = () => {
      this.props.setUnsavedChanges(true);
      if (this.props.autorefresh && this.props.isPlaying && !this.justTidied) {
        this.props.clearConsole();
        this.props.startAutoRefreshSketch();
      }
      this.justTidied = false;
    };

    // Force refresh in the case of a color change
    if (this.lastChange - this.lastWidgetChangeTime <= 1000) {
      cb();
    } else {
      setTimeout(() => {
        if (Date.now() - this.lastChange >= REFRESH_DELAY) cb();
      }, REFRESH_DELAY);
    }
  }

  getFileMode(fileName) {
    if (fileName.match(/.+\.js$/i)) {
      return 'javascript';
    } else if (fileName.match(/.+\.css$/i)) {
      return 'css';
    } else if (fileName.match(/.+\.html$/i)) {
      return 'htmlmixed';
    } else if (fileName.match(/.+\.json$/i)) {
      return 'application/json';
    } else if (fileName.match(/.+\.(frag|vert)$/i)) {
      return 'clike';
    } else if (fileName.match(/.+\.(png|jpg|bmp|jpeg)$/i)) {
      return 'imagelike';
    }
    return 'text/plain';
  }

  getContent() {
    return this.props.file;
  }

  findPrev() {
    this.cmView.focus();
    cmSearch.findPrevious(this.cmView);
  }

  findNext() {
    this.cmView.focus();
    cmSearch.findNext(this.cmView);
  }

  showFind() {
    cmSearch.openSearchPanel(this.cmView);
  }

  tidyCode() {
    this.justTidied = true;
    this.props.logRun('tidy');
    const mode = this.getFileMode(this.props.file.name);
    const parserMap = { javascript: 'babel', css: 'css', htmlmixed: 'html' };
    if (new Set(['javascript', 'css', 'htmlmixed']).has(mode)) {
      const parser = parserMap[mode];
      const newCode = prettier.format(this.props.file.content, { parser, plugins: prettierPlugins });
      this.props.updateFileContent(this.props.file.id, newCode);
    }
    this.cmView.focus();
  }

  render() {
    const editorSectionClass = classNames({
      editor: true,
      'sidebar--contracted': !this.props.isExpanded,
      'editor--options': this.props.editorOptionsVisible
    });

    const language = this.getFileMode(this.props.file.name);
    const isFolder = this.props.file.fileType === 'folder';
    const isNonTextFile = this.props.file.url || language === 'imagelike';
    const code = this.props.file.content || [...new Array(25)].join('\n');
    return (
      <section className={editorSectionClass}>
        <header className="editor__header">
          <button
            aria-label={this.props.t('Editor.OpenSketchARIA')}
            className="sidebar__contract"
            onClick={this.props.collapseSidebar}
          >
            <LeftArrowIcon focusable="false" aria-hidden="true" />
          </button>
          <button
            aria-label={this.props.t('Editor.CloseSketchARIA')}
            className="sidebar__expand"
            onClick={this.props.expandSidebar}
          >
            <RightArrowIcon focusable="false" aria-hidden="true" />
          </button>
          <div className="editor__file-name">
            <span>
              {this.props.file.name}
              <span className="editor__unsaved-changes">
                {this.props.unsavedChanges ? (
                  <UnsavedChangesDotIcon
                    role="img"
                    aria-label={this.props.t('Editor.UnsavedChangesARIA')}
                    focusable="false"
                  />
                ) : null}
              </span>
            </span>
            <Timer projectSavedTime={this.props.projectSavedTime} isUserOwner={this.props.isUserOwner} />
          </div>
        </header>
        <article className="editor-holder">
          {language === 'imagelike' && (
            <div>
              <img src={this.props.file.url} />
              <div />
            </div>
          )}
          {!isFolder && !isNonTextFile && (
            <CodeMirror
              code={code}
              lang={language}
              onChange={this.onChange}
              shapeToolboxCb={this.props.openShapeToolbox}
              provideView={(view) => (this.cmView = view)}
              keyBindings={this.keyBindings}
              keywords={KEYWORDS}
              configOptions={{
                autocloseBracketsQuotes: this.props.autocloseBracketsQuotes,
                fontSize: this.props.fontSize,
                linewrap: this.props.linewrap,
                theme: this.props.theme,
                autocomplete: this.props.autocomplete
              }}
              extensions={[
                lintGutter(),
                linter((view) => {
                  const code = view.state.doc.toString();
                  const config = view.state.field(cmStatePlugin);
                  const localLanguage = config.lang || language;

                  let msgs = [];

                  function toOffset(line, ch) {
                    return view.state.doc.line(line).from + ch - 1;
                  }

                  function lineOffset(line) {
                    return view.state.doc.line(line).from;
                  }

                  if (localLanguage === 'javascript') {
                    JSHINT(code, jshintRules);
                    msgs = JSHINT.errors.map((e) => ({
                      message: e.reason,
                      severity: e.id && e.id.includes('error') ? 'error' : 'warning',
                      from: toOffset(e.line, e.character),
                      to: toOffset(e.line, e.character + 1)
                    }));
                  } else if (localLanguage === 'htmlmixed') {
                    // msgs = HTMLHint.verify(code, htmlHintConfig).

                    msgs = HTMLHint.verify(code).map((e) => {
                      return {
                        message: e.message,
                        severity: e.type,
                        from: lineOffset(e.line),
                        to: lineOffset(e.line + 1) - 1
                      };
                    });
                  } else if (localLanguage === 'css') {
                    msgs = CSSLint.verify(code).messages.map((e) => {
                      return {
                        message: e.message,
                        severity: e.type,
                        from: lineOffset(e.line),
                        to: lineOffset(e.line + 1) - 1
                      };
                    });
                  }

                  const langToShort = { javascript: 'js', htmlmixed: 'html', css: 'css' };
                  const langShort = langToShort[localLanguage] || '';
                  trackEvent({
                    eventName: 'lint',
                    context: [msgs.length, langShort]
                  });
                  return msgs;
                })
              ]}
              onWidgetChange={(widgetEvent) => {
                this.lastWidgetChangeTime = Date.now();
                trackEvent({ eventName: widgetEvent });
              }}
            />
          )}
        </article>
        <EditorAccessibility lintMessages={this.props.lintMessages} />
      </section>
    );
  }
}

Editor.propTypes = {
  autocloseBracketsQuotes: PropTypes.bool.isRequired,
  autocomplete: PropTypes.bool.isRequired,
  // lineNumbers: PropTypes.bool.isRequired,
  // lintWarning: PropTypes.bool.isRequired,
  linewrap: PropTypes.bool.isRequired,
  lintMessages: PropTypes.arrayOf(
    PropTypes.shape({
      severity: PropTypes.string.isRequired,
      line: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  // consoleEvents: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     method: PropTypes.string.isRequired,
  //     args: PropTypes.arrayOf(PropTypes.string)
  //   })
  // ),
  // updateLintMessage: PropTypes.func.isRequired,
  // clearLintMessage: PropTypes.func.isRequired,
  updateFileContent: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired,
  editorOptionsVisible: PropTypes.bool.isRequired,
  // showEditorOptions: PropTypes.func.isRequired,
  // closeEditorOptions: PropTypes.func.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
  startAutoRefreshSketch: PropTypes.func.isRequired,
  autorefresh: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  projectSavedTime: PropTypes.string.isRequired,
  // files: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     content: PropTypes.string.isRequired
  //   })
  // ).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  collapseSidebar: PropTypes.func.isRequired,
  expandSidebar: PropTypes.func.isRequired,
  isUserOwner: PropTypes.bool.isRequired,
  clearConsole: PropTypes.func.isRequired,
  // showRuntimeErrorWarning: PropTypes.func.isRequired,
  // runtimeErrorWarningVisible: PropTypes.bool.isRequired,
  provideController: PropTypes.func.isRequired,
  logRun: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  openShapeToolbox: PropTypes.func.isRequired,
  showingShapeToolbox: PropTypes.bool.isRequired
};

// Editor.defaultProps = {
//   consoleEvents: []
// };

function mapStateToProps(state) {
  return {
    files: state.files,
    file:
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

    ...state.preferences,
    ...state.ide,
    ...state.project,
    ...state.editorAccessibility,
    isExpanded: state.ide.sidebarIsExpanded,
    projectSavedTime: state.project.updatedAt,
    isUserOwner: getIsUserOwner(state)
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Editor));
