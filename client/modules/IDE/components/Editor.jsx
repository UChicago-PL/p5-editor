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
import Timer from '../components/Timer';
import EditorAccessibility from '../components/EditorAccessibility';

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

import JeuceEditor from '../../../../../jeuce/src/components/App.tsx';
import * as cmSearch from '../../../../../jeuce/node_modules/@codemirror/search';
import { linter, lintGutter } from '../../../../../jeuce/node_modules/@codemirror/lint';

import { p5FunctionKeywords, p5VariableKeywords } from '../../../utils/p5-keywords';

window.JSHINT = JSHINT;
window.CSSLint = CSSLint;
window.HTMLHint = HTMLHint;
// delete CodeMirror.keyMap.sublime['Shift-Tab];

const INDENTATION_AMOUNT = 2;
const prettierPlugins = [parserBabel, parserHtml, parserCSS];

const REFRESH_DELAY = 1000;

const KEYWORDS = { function: Object.keys(p5FunctionKeywords), variable: Object.keys(p5VariableKeywords) };

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.tidyCode = this.tidyCode.bind(this);
    this.keyBindings = [
      {
        key: `${metaKey}-m`,
        run: () => this.tidyCode()
      }
    ];
    // keep track of when the code was tidied, to prevent invoking redundant refresh and log save
    // on the 'onChange' event of the code being tidied
    this.justTidied = false;
    this.lastChange = 0;
    this.cmView = null;
    this.lastColorChangeTime = 0;

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
    // this.beep = new Audio(beepUrl);
    // this.widgets = [];
    // this._cm = CodeMirror(this.codemirrorContainer, {
    //   // eslint-disable-line
    //   theme: `p5-${this.props.theme}`,
    //   lineNumbers: this.props.lineNumbers,
    //   styleActiveLine: true,
    //   inputStyle: 'contenteditable',
    //   lineWrapping: this.props.linewrap,
    //   fixedGutter: false,
    //   foldGutter: true,
    //   foldOptions: { widget: '\u2026' },
    //   gutters: ['CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    //   keyMap: 'sublime',
    //   highlightSelectionMatches: true, // highlight current search match
    //   matchBrackets: true,
    //   autoCloseBrackets: this.props.autocloseBracketsQuotes,
    //   styleSelectedText: true
    //   // lint: {
    //   //   onUpdateLinting: (annotations) => {
    //   //     this.updateLintingMessageAccessibility(annotations);
    //   //   },
    //   //   options: {
    //   //     asi: true,
    //   //     eqeqeq: true,
    //   //     '-W041': false,
    //   //     esversion: 7
    //   //   }
    //   // }
    // });

    // const replaceCommand = metaKey === 'Ctrl' ? `${metaKey}-H` : `${metaKey}-Option-F`;
    // this._cm.setOption('extraKeys', {
    //   Tab: (cm) => {
    //     // might need to specify and indent more?
    //     const selection = cm.doc.getSelection();
    //     if (selection.length > 0) {
    //       cm.execCommand('indentMore');
    //     } else {
    //       cm.replaceSelection(' '.repeat(INDENTATION_AMOUNT));
    //     }
    //   },
    //   [`${metaKey}-Enter`]: () => null,
    //   [`Shift-${metaKey}-Enter`]: () => null,
    //   [`${metaKey}-F`]: 'findPersistent',
    //   [`${metaKey}-G`]: 'findNext',
    //   [`Shift-${metaKey}-G`]: 'findPrev',
    //   [replaceCommand]: 'replace'
    // });

    // this._cm.on('keyup', () => {
    //   const temp = this.props.t('Editor.KeyUpLineNumber', {
    //     lineNumber: parseInt(this._cm.getCursor().line + 1, 10)
    //   });
    //   document.getElementById('current-line').innerHTML = temp;
    // });

    // this._cm.on('keydown', (_cm, e) => {
    //   // 9 === Tab
    //   if (e.keyCode === 9 && e.shiftKey) {
    //     this.tidyCode();
    //   }
    // });
    //
    // this._cm.getWrapperElement().style['font-size'] = `${this.props.fontSize}px`;

    this.props.provideController({
      tidyCode: this.tidyCode,
      showFind: this.showFind,
      findNext: this.findNext,
      findPrev: this.findPrev,
      getContent: this.getContent
    });

    // this very very hacky function gets called in codemirror-search
    // which allows us to log using the replaceAll stuff
    // window.replaceSnooper = (isReplaceAll) => {
    //   this.props.logRun(`structure-update-replace${isReplaceAll ? '-all' : ''}`);
    // };
  }

  componentDidUpdate(prevProps) {
    if (this.props.file.content !== prevProps.file.content) {
      if (!prevProps.unsavedChanges) {
        setTimeout(() => this.props.setUnsavedChanges(false), 400);
      }
    }
    // if (this.props.fontSize !== prevProps.fontSize) {
    //   this._cm.getWrapperElement().style['font-size'] = `${this.props.fontSize}px`;
    // }
    // if (this.props.linewrap !== prevProps.linewrap) {
    //   this._cm.setOption('lineWrapping', this.props.linewrap);
    // }
    // if (this.props.theme !== prevProps.theme) {
    //   this._cm.setOption('theme', `p5-${this.props.theme}`);
    // }
    // if (this.props.lineNumbers !== prevProps.lineNumbers) {
    //   this._cm.setOption('lineNumbers', this.props.lineNumbers);
    // }
    // if (this.props.autocloseBracketsQuotes !== prevProps.autocloseBracketsQuotes) {
    //   this._cm.setOption('autoCloseBrackets', this.props.autocloseBracketsQuotes);
    // }

    // if (prevProps.consoleEvents !== this.props.consoleEvents) {
    //   this.props.showRuntimeErrorWarning();
    // }
    // for (let i = 0; i < this._cm.lineCount(); i += 1) {
    //   this._cm.removeLineClass(i, 'background', 'line-runtime-error');
    // }
    // if (this.props.runtimeErrorWarningVisible) {
    //   this.props.consoleEvents.forEach((consoleEvent) => {
    //     if (consoleEvent.method === 'error') {
    //       if (
    //         consoleEvent.data &&
    //         consoleEvent.data[0] &&
    //         consoleEvent.data[0].indexOf &&
    //         consoleEvent.data[0].indexOf(')') > -1
    //       ) {
    //         const n = consoleEvent.data[0].replace(')', '').split(' ');
    //         const lineNumber = parseInt(n[n.length - 1], 10) - 1;
    //         const { source } = consoleEvent;
    //         const fileName = this.props.file.name;
    //         const errorFromJavaScriptFile = `${source}.js` === fileName;
    //         const errorFromIndexHTML = source === fileName && fileName === 'index.html';
    //         if (!Number.isNaN(lineNumber) && (errorFromJavaScriptFile || errorFromIndexHTML)) {
    //           this._cm.addLineClass(lineNumber, 'background', 'line-runtime-error');
    //         }
    //       }
    //     }
    //   });
    // }
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
    if (this.lastChange - this.lastColorChangeTime <= 1000) {
      cb();
    } else {
      setTimeout(() => {
        if (Date.now() - this.lastChange >= REFRESH_DELAY) cb();
      }, REFRESH_DELAY);
    }
  }

  getFileMode(fileName) {
    let mode;
    if (fileName.match(/.+\.js$/i)) {
      mode = 'javascript';
    } else if (fileName.match(/.+\.css$/i)) {
      mode = 'css';
    } else if (fileName.match(/.+\.html$/i)) {
      mode = 'htmlmixed';
    } else if (fileName.match(/.+\.json$/i)) {
      mode = 'application/json';
    } else if (fileName.match(/.+\.(frag|vert)$/i)) {
      mode = 'clike';
    } else {
      mode = 'text/plain';
    }
    return mode;
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

  // toggleEditorOptions() {
  //   if (this.props.editorOptionsVisible) {
  //     this.props.closeEditorOptions();
  //   } else {
  //     this.optionsButton.focus();
  //     this.props.showEditorOptions();
  //   }
  // }
  //
  render() {
    const editorSectionClass = classNames({
      editor: true,
      'sidebar--contracted': !this.props.isExpanded,
      'editor--options': this.props.editorOptionsVisible
    });

    const editorHolderClass = classNames({
      'editor-holder': true,
      'editor-holder--hidden': this.props.file.fileType === 'folder' || this.props.file.url
    });

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
          <JeuceEditor
            code={this.props.file.content}
            lang={this.getFileMode(this.props.file.name)}
            onChange={this.onChange}
            shapeToolboxCb={this.props.openShapeToolbox}
            provideView={(view) => (this.cmView = view)}
            keyBindings={this.keyBindings}
            keywords={KEYWORDS}
            extensions={[
              lintGutter(),
              linter((view) => {
                JSHINT(view.state.doc.toString(), { esversion: 11 });

                function toOffset(line, ch) {
                  return view.state.doc.line(line).from + ch - 1;
                }

                return JSHINT.errors.map((e) => ({
                  message: e.reason,
                  severity: 'warning',
                  from: toOffset(e.line, e.character),
                  to: toOffset(e.line, e.character + e.evidence ? e.evidence.length : 1)
                }));
              })
            ]}
            onColorChange={() => {
              this.lastColorChangeTime = Date.now();
            }}
          />
        </article>
        <EditorAccessibility lintMessages={this.props.lintMessages} />
      </section>
    );
  }
}

Editor.propTypes = {
  autocloseBracketsQuotes: PropTypes.bool.isRequired,
  lineNumbers: PropTypes.bool.isRequired,
  lintWarning: PropTypes.bool.isRequired,
  linewrap: PropTypes.bool.isRequired,
  lintMessages: PropTypes.arrayOf(
    PropTypes.shape({
      severity: PropTypes.string.isRequired,
      line: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  consoleEvents: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.string.isRequired,
      args: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  updateLintMessage: PropTypes.func.isRequired,
  clearLintMessage: PropTypes.func.isRequired,
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
  showEditorOptions: PropTypes.func.isRequired,
  closeEditorOptions: PropTypes.func.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
  startAutoRefreshSketch: PropTypes.func.isRequired,
  autorefresh: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  projectSavedTime: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  collapseSidebar: PropTypes.func.isRequired,
  expandSidebar: PropTypes.func.isRequired,
  isUserOwner: PropTypes.bool.isRequired,
  clearConsole: PropTypes.func.isRequired,
  showRuntimeErrorWarning: PropTypes.func.isRequired,
  runtimeErrorWarningVisible: PropTypes.bool.isRequired,
  provideController: PropTypes.func.isRequired,
  logRun: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  openShapeToolbox: PropTypes.func.isRequired
};

Editor.defaultProps = {
  consoleEvents: []
};

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
