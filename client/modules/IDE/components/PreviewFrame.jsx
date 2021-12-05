import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
// import escapeStringRegexp from 'escape-string-regexp';
import { isEqual } from 'lodash';
import srcDoc from 'srcdoc-polyfill';
import loopProtect from 'loop-protect';
import { JSHINT } from 'jshint';
import decomment from 'decomment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Decode } from 'console-feed';
import { getBlobUrl, setBlobUrl } from '../actions/files';
import { resolvePathToFile } from '../../../../server/utils/filePath';
import {
  EXTERNAL_LINK_REGEX,
  MEDIA_FILE_QUOTED_REGEX,
  MEDIA_FILE_REGEX,
  NOT_EXTERNAL_LINK_REGEX,
  PLAINTEXT_FILE_REGEX,
  STRING_REGEX
} from '../../../../server/utils/fileUtils';
import { getAllScriptOffsets, hijackConsoleErrorsScript, startTag } from '../../../utils/consoleUtils';

import { getHTMLFile } from '../reducers/files';

import { endSketchRefresh, expandConsole, stopSketch } from '../actions/ide';
import { setGridOutput, setSoundOutput, setTextOutput } from '../actions/preferences';
import { clearConsole, dispatchConsoleEvent } from '../actions/console';

import cs111Prelude from '../../../utils/cs111Prelude';
import falafel from 'falafel';

const shouldRenderSketch = (props, prevProps = undefined) => {
  const { isPlaying, previewIsRefreshing, fullView } = props;

  // if the user explicitly clicks on the play button
  if (isPlaying && previewIsRefreshing) return true;

  if (!prevProps) return false;

  return (
    props.isPlaying !== prevProps.isPlaying || // if sketch starts or stops playing, want to rerender
    props.isAccessibleOutputPlaying !== prevProps.isAccessibleOutputPlaying || // if user switches textoutput preferences
    props.textOutput !== prevProps.textOutput ||
    props.gridOutput !== prevProps.gridOutput ||
    props.soundOutput !== prevProps.soundOutput ||
    (fullView && props.files[0].id !== prevProps.files[0].id)
  );
};

class PreviewFrame extends React.Component {
  constructor(props) {
    super(props);
    this.handleConsoleEvent = this.handleConsoleEvent.bind(this);
    this.hasErrored = false;
  }

  componentDidMount() {
    window.addEventListener('message', this.handleConsoleEvent);

    const props = {
      ...this.props,
      previewIsRefreshing: this.props.previewIsRefreshing,
      isAccessibleOutputPlaying: this.props.isAccessibleOutputPlaying
    };
    if (shouldRenderSketch(props)) this.renderSketch();
  }

  componentDidUpdate(prevProps) {
    if (shouldRenderSketch(this.props, prevProps)) this.renderSketch();
    // small bug - if autorefresh is on, and the usr changes files
    // in the sketch, preview will reload
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleConsoleEvent);
    const iframeBody = this.iframeElement.contentDocument.body;
    if (iframeBody) {
      ReactDOM.unmountComponentAtNode(iframeBody);
    }
    const iframeProbingBody = this.iframeProbingElement.contentDocument.body;
    if (iframeProbingBody) {
      ReactDOM.unmountComponentAtNode(iframeProbingBody);
    }
  }

  handleConsoleEvent(messageEvent) {
    if (Array.isArray(messageEvent.data)) {
      const decodedMessages = messageEvent.data.map((message) =>
        Object.assign(Decode(message.log), {
          source: message.source
        })
      );

      if (decodedMessages.some((message) => message.method === 'error')) {
        console.log('ERRORED');
        this.hasErrored = true;
      }

      decodedMessages.every((message, index, arr) => {
        const { data: args } = message;
        let hasInfiniteLoop = false;
        Object.keys(args).forEach((key) => {
          if (typeof args[key] === 'string' && args[key].includes('Exiting potential infinite loop')) {
            this.props.stopSketch();
            this.props.expandConsole();
            hasInfiniteLoop = true;
          }
        });
        if (hasInfiniteLoop) {
          return false;
        }
        if (index === arr.length - 1) {
          Object.assign(message, { times: 1 });
          return false;
        }
        const cur = Object.assign(message, { times: 1 });
        const nextIndex = index + 1;
        while (isEqual(cur.data, arr[nextIndex].data) && cur.method === arr[nextIndex].method) {
          cur.times += 1;
          arr.splice(nextIndex, 1);
          if (nextIndex === arr.length) {
            return false;
          }
        }
        return true;
      });

      this.props.dispatchConsoleEvent(decodedMessages);
    }
  }

  addLoopProtect(sketchDoc) {
    const scriptsInHTML = sketchDoc.getElementsByTagName('script');
    const scriptsInHTMLArray = Array.prototype.slice.call(scriptsInHTML);
    scriptsInHTMLArray.forEach((script) => {
      script.innerHTML = this.jsPreprocess(script.innerHTML); // eslint-disable-line
    });
  }

  jsPreprocess(jsText) {
    let newContent = jsText;
    // check the code for js errors before sending it to strip comments
    // or loops.
    JSHINT(newContent, { esversion: 11 });

    if (JSHINT.errors.length === 0) {
      newContent = decomment(newContent, {
        ignore: /\/\/\s*noprotect/g,
        space: true
      });
      newContent = loopProtect(newContent);
    }
    return newContent;
  }

  mergeLocalFilesAndEditorActiveFile() {
    const files = this.props.files.slice();
    if (this.props.cmController.getContent) {
      const activeFileInEditor = this.props.cmController.getContent();
      files.find((file) => file.id === activeFileInEditor.id).content = activeFileInEditor.content;
    }
    return files;
  }

  injectLocalFiles() {
    const htmlFile = this.props.htmlFile.content;
    let scriptOffs = [];
    const files = this.mergeLocalFilesAndEditorActiveFile();
    const resolvedFiles = this.resolveJSAndCSSLinks(files);
    const parser = new DOMParser();
    const sketchDoc = parser.parseFromString(htmlFile, 'text/html');

    const base = sketchDoc.createElement('base');
    base.href = `${window.location.href}/`;
    sketchDoc.head.appendChild(base);

    this.resolvePathsForElementsWithAttribute('src', sketchDoc, resolvedFiles);
    this.resolvePathsForElementsWithAttribute('href', sketchDoc, resolvedFiles);
    // should also include background, data, poster, but these are used way less often

    this.resolveScripts(sketchDoc, resolvedFiles);
    this.resolveStyles(sketchDoc, resolvedFiles);

    const accessiblelib = sketchDoc.createElement('script');
    accessiblelib.setAttribute(
      'src',
      'https://cdn.rawgit.com/processing/p5.accessibility/v0.1.1/dist/p5-accessibility.js'
    );
    const accessibleOutputs = sketchDoc.createElement('section');
    accessibleOutputs.setAttribute('id', 'accessible-outputs');
    accessibleOutputs.setAttribute('aria-label', 'accessible-output');
    if (this.props.textOutput) {
      sketchDoc.body.appendChild(accessibleOutputs);
      sketchDoc.body.appendChild(accessiblelib);
      const textSection = sketchDoc.createElement('section');
      textSection.setAttribute('id', 'textOutput-content');
      sketchDoc.getElementById('accessible-outputs').appendChild(textSection);
    }
    if (this.props.gridOutput) {
      sketchDoc.body.appendChild(accessibleOutputs);
      sketchDoc.body.appendChild(accessiblelib);
      const gridSection = sketchDoc.createElement('section');
      gridSection.setAttribute('id', 'tableOutput-content');
      sketchDoc.getElementById('accessible-outputs').appendChild(gridSection);
    }
    if (this.props.soundOutput) {
      sketchDoc.body.appendChild(accessibleOutputs);
      sketchDoc.body.appendChild(accessiblelib);
      const soundSection = sketchDoc.createElement('section');
      soundSection.setAttribute('id', 'soundOutput-content');
      sketchDoc.getElementById('accessible-outputs').appendChild(soundSection);
    }

    const previewScripts = sketchDoc.createElement('script');
    previewScripts.src = '/previewScripts.js';
    sketchDoc.head.appendChild(previewScripts);

    const cs111PreludeScript = sketchDoc.createElement('script');
    cs111PreludeScript.innerHTML = cs111Prelude;
    sketchDoc.head.appendChild(cs111PreludeScript);

    const sketchDocString = `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
    scriptOffs = getAllScriptOffsets(sketchDocString);
    const consoleErrorsScript = sketchDoc.createElement('script');
    consoleErrorsScript.innerHTML = hijackConsoleErrorsScript(JSON.stringify(scriptOffs));
    this.addLoopProtect(sketchDoc);
    sketchDoc.head.insertBefore(consoleErrorsScript, sketchDoc.head.firstElement);

    return `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
  }

  resolvePathsForElementsWithAttribute(attr, sketchDoc, files) {
    const elements = sketchDoc.querySelectorAll(`[${attr}]`);
    const elementsArray = Array.prototype.slice.call(elements);
    elementsArray.forEach((element) => {
      if (element.getAttribute(attr).match(MEDIA_FILE_REGEX)) {
        const resolvedFile = resolvePathToFile(element.getAttribute(attr), files);
        if (resolvedFile && resolvedFile.url) {
          element.setAttribute(attr, resolvedFile.url);
        }
      }
    });
  }

  resolveJSAndCSSLinks(files) {
    const newFiles = [];
    files.forEach((file) => {
      const newFile = { ...file };
      if (file.name.match(/.*\.js$/i)) {
        newFile.content = this.resolveJSLinksInString(newFile.content, files);
      } else if (file.name.match(/.*\.css$/i)) {
        newFile.content = this.resolveCSSLinksInString(newFile.content, files);
      }
      newFiles.push(newFile);
    });
    return newFiles;
  }

  resolveJSLinksInString(content, files) {
    let newContent = content;
    let jsFileStrings = content.match(STRING_REGEX);
    jsFileStrings = jsFileStrings || [];
    jsFileStrings.forEach((jsFileString) => {
      if (jsFileString.match(MEDIA_FILE_QUOTED_REGEX)) {
        const filePath = jsFileString.substr(1, jsFileString.length - 2);
        const quoteCharacter = jsFileString.substr(0, 1);
        const resolvedFile = resolvePathToFile(filePath, files);

        if (resolvedFile) {
          if (resolvedFile.url) {
            newContent = newContent.replace(jsFileString, quoteCharacter + resolvedFile.url + quoteCharacter);
          } else if (resolvedFile.name.match(PLAINTEXT_FILE_REGEX)) {
            // could also pull file from API instead of using bloburl
            const blobURL = getBlobUrl(resolvedFile);
            this.props.setBlobUrl(resolvedFile, blobURL);

            newContent = newContent.replace(jsFileString, quoteCharacter + blobURL + quoteCharacter);
          }
        }
      }
    });

    return this.jsPreprocess(newContent);
  }

  resolveCSSLinksInString(content, files) {
    let newContent = content;
    let cssFileStrings = content.match(STRING_REGEX);
    cssFileStrings = cssFileStrings || [];
    cssFileStrings.forEach((cssFileString) => {
      if (cssFileString.match(MEDIA_FILE_QUOTED_REGEX)) {
        const filePath = cssFileString.substr(1, cssFileString.length - 2);
        const quoteCharacter = cssFileString.substr(0, 1);
        const resolvedFile = resolvePathToFile(filePath, files);
        if (resolvedFile) {
          if (resolvedFile.url) {
            newContent = newContent.replace(
              cssFileString,
              quoteCharacter + resolvedFile.url + quoteCharacter
            );
          }
        }
      }
    });
    return newContent;
  }

  resolveScripts(sketchDoc, files) {
    const scriptsInHTML = sketchDoc.getElementsByTagName('script');
    const scriptsInHTMLArray = Array.prototype.slice.call(scriptsInHTML);
    scriptsInHTMLArray.forEach((script) => {
      if (script.getAttribute('src') && script.getAttribute('src').match(NOT_EXTERNAL_LINK_REGEX) !== null) {
        const resolvedFile = resolvePathToFile(script.getAttribute('src'), files);
        if (resolvedFile) {
          if (resolvedFile.url) {
            script.setAttribute('src', resolvedFile.url);
          } else {
            script.setAttribute('data-tag', `${startTag}${resolvedFile.name}`);
            script.removeAttribute('src');
            const contentWithHook = falafel(resolvedFile.content, (node) => {
              if (node.type === 'FunctionDeclaration' && node.id.name === 'draw') {
                node.body.update(
                  node.body.source().slice(0, -1) +
                    "\n;parent.document.body.dispatchEvent(new Event('finishedLoading'));\n}"
                );
              }
            });
            script.innerHTML = contentWithHook;
          }
        }
      } else if (
        !(script.getAttribute('src') && script.getAttribute('src').match(EXTERNAL_LINK_REGEX)) !== null
      ) {
        script.setAttribute('crossorigin', '');
        script.innerHTML = this.resolveJSLinksInString(script.innerHTML, files); // eslint-disable-line
      }
    });
  }

  resolveStyles(sketchDoc, files) {
    const inlineCSSInHTML = sketchDoc.getElementsByTagName('style');
    const inlineCSSInHTMLArray = Array.prototype.slice.call(inlineCSSInHTML);
    inlineCSSInHTMLArray.forEach((style) => {
      style.innerHTML = this.resolveCSSLinksInString(style.innerHTML, files); // eslint-disable-line
    });

    const cssLinksInHTML = sketchDoc.querySelectorAll('link[rel="stylesheet"]');
    const cssLinksInHTMLArray = Array.prototype.slice.call(cssLinksInHTML);
    cssLinksInHTMLArray.forEach((css) => {
      if (css.getAttribute('href') && css.getAttribute('href').match(NOT_EXTERNAL_LINK_REGEX) !== null) {
        const resolvedFile = resolvePathToFile(css.getAttribute('href'), files);
        if (resolvedFile) {
          if (resolvedFile.url) {
            css.href = resolvedFile.url; // eslint-disable-line
          } else {
            const style = sketchDoc.createElement('style');
            style.innerHTML = `\n${resolvedFile.content}`;
            sketchDoc.head.appendChild(style);
            css.parentElement.removeChild(css);
          }
        }
      }
    });
  }

  renderSketch() {
    this.hasErrored = false;

    if (this.props.isPlaying) {
      if (this.props.endSketchRefresh) {
        this.props.endSketchRefresh();
      }

      // This method is modified so that it only renders the sketch after ensuring that there is no startup error
      // To make this happen, the draw function is modified to fire the `finishedLoading` event, as a way of
      // gauging when the p5 code actually starts running
      // Then, we wait for a small time (ERROR_CHECK_DELAY) in order to give time for error handling mechanism
      // to kick in, and for any error logs to be displayed
      // Then, if there have been no error logs, we render the new sketch

      const localFiles = this.injectLocalFiles();
      this.props.clearConsole();

      const ERROR_CHECK_DELAY = 500;

      const onLoaded = () => {
        document.body.removeEventListener('finishedLoading', onLoaded);
        setTimeout(() => {
          if (!this.hasErrored) {
            this.props.clearConsole();

            this.iframeProbingElement.srcdoc = '';
            srcDoc.set(this.iframeProbingElement, '  ');

            srcDoc.set(this.iframeElement, localFiles);
          }
        }, ERROR_CHECK_DELAY);
      };

      srcDoc.set(this.iframeProbingElement, localFiles);

      document.body.addEventListener('finishedLoading', onLoaded);
    } else {
      this.iframeElement.srcdoc = '';
      srcDoc.set(this.iframeElement, '  ');

      this.iframeProbingElement.srcdoc = '';
      srcDoc.set(this.iframeProbingElement, '  ');
    }
  }

  render() {
    const iframeClass = classNames({
      'preview-frame': true,
      'preview-frame--full-view': this.props.fullView
    });
    const sandboxAttributes =
      'allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-forms allow-modals allow-downloads';
    return (
      <>
        <iframe
          id="canvas_frame"
          className={iframeClass}
          aria-label="sketch output"
          role="main"
          frameBorder="0"
          title="sketch preview"
          ref={(element) => {
            this.iframeElement = element;
          }}
          sandbox={sandboxAttributes}
        />
        <iframe
          id="canvas_probing_frame"
          className={iframeClass}
          aria-label="sketch output"
          role="main"
          frameBorder="0"
          title="sketch preview"
          ref={(element) => {
            this.iframeProbingElement = element;
          }}
          sandbox={sandboxAttributes}
          // display: 'none' causes a strange network error
          style={{ visibility: 'hidden' }}
        />
      </>
    );
  }
}

PreviewFrame.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isAccessibleOutputPlaying: PropTypes.bool.isRequired,
  textOutput: PropTypes.bool.isRequired,
  gridOutput: PropTypes.bool.isRequired,
  soundOutput: PropTypes.bool.isRequired,
  htmlFile: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  dispatchConsoleEvent: PropTypes.func.isRequired,
  endSketchRefresh: PropTypes.func.isRequired,
  previewIsRefreshing: PropTypes.bool.isRequired,
  fullView: PropTypes.bool,
  setBlobUrl: PropTypes.func.isRequired,
  stopSketch: PropTypes.func.isRequired,
  expandConsole: PropTypes.func.isRequired,
  clearConsole: PropTypes.func.isRequired,
  cmController: PropTypes.shape({
    getContent: PropTypes.func
  })
};

PreviewFrame.defaultProps = {
  fullView: false,
  cmController: {}
};

function mapStateToProps(state, ownProps) {
  if (ownProps.fullView) {
    return {
      files: state.files,
      htmlFile: getHTMLFile(state.files),
      isPlaying: true,
      isAccessibleOutputPlaying: false,
      textOutput: false,
      gridOutput: false,
      soundOutput: false,
      language: state.preferences.language,
      autorefresh: false,
      previewIsRefreshing: false
    };
  }
  return {
    files: state.files,
    htmlFile: getHTMLFile(state.files),
    content: (
      state.files.find((file) => file.isSelectedFile) ||
      state.files.find((file) => file.name === 'sketch.js') ||
      state.files.find((file) => file.name !== 'root')
    ).content,
    isPlaying: state.ide.isPlaying,
    isAccessibleOutputPlaying: state.ide.isAccessibleOutputPlaying,
    previewIsRefreshing: state.ide.previewIsRefreshing,
    textOutput: state.preferences.textOutput,
    gridOutput: state.preferences.gridOutput,
    soundOutput: state.preferences.soundOutput,
    language: state.preferences.language,
    autorefresh: state.preferences.autorefresh
  };
}

const mapDispatchToProps = {
  stopSketch,
  expandConsole,
  endSketchRefresh,
  setTextOutput,
  setGridOutput,
  setSoundOutput,
  setBlobUrl,
  clearConsole,
  dispatchConsoleEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewFrame);
