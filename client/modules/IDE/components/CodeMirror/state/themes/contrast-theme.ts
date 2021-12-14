import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

// const chalky = '#e5c07b',
//   coral = '#e06c75',
//   cyan = '#56b6c2',
//   invalid = '#ffffff',
//   ivory = '#abb2bf',
//   stone = '#7d8799', // Brightened compared to original to increase contrast
//   malibu = '#61afef',
//   sage = '#98c379',
//   whiskey = '#d19a66',
//   violet = '#c678dd',
//   darkBackground = '#21252b',
//   highlightBackground = '#2c313a',
//   background = '#282c34',
//   tooltipBackground = '#353a42',
//   selection = '#3E4451',
//   cursor = '#528bff';

const black = '#1C1C1C';
const gray = '#A0A0A0';
const white = '#FDFDFD';
const darkgray = '#333333';
const lightgray = '#C1C1C1';
const blue = '#00FFFF';
const green = '#2DE9B6';
const yellow = '#F5DC23';
const orange = '#FFA95D';
const pink = '#FFA9D9';

const contrastGutter = '#454545';
const contrastNumber = '#FDFDFD';
const contrastSelected = 'rgba(45, 123, 182, 25)';
const contrastActiveline = '#999999';

/// The editor theme styles for One Dark.
export const contrastTheme = EditorView.theme(
  {
    '&': {
      color: white,
      backgroundColor: black
    },

    '.cm-content': {
      caretColor: white
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: white },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: contrastSelected
    },

    '.cm-panels': { backgroundColor: black, color: white },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid white' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid white' },

    '.cm-searchMatch': {
      backgroundColor: '#72a1ff59',
      outline: '1px solid #457dff'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#6199ff2f'
    },

    '.cm-activeLine': { backgroundColor: darkgray }, // might be wrong
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: lightgray,
      outline: '1px solid #515a6b'
    },

    '.cm-gutters': {
      backgroundColor: black,
      color: contrastNumber,
      border: 'none'
    },

    '.cm-activeLineGutter': {
      backgroundColor: darkgray
    },

    '.cm-foldPlaceholder': {
      //   backgroundColor: 'transparent',
      backgroundColor: white,
      //   border: 'none',
      color: '#333;'
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: darkgray
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: darkgray,
      borderBottomColor: darkgray
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: contrastActiveline,
        color: white
      }
    }
  },
  { dark: true }
);

/// The highlighting style for code in the reconstructed contrast theme.
// missing builtin?
export const contrastHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: yellow },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: white },
  { tag: [t.labelName], color: white },
  { tag: [t.function(t.variableName)], color: blue },

  { tag: [t.definition(t.name), t.separator], color: blue },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: pink
  },
  {
    tag: [t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: white
  },
  { tag: [t.operator], color: lightgray },
  { tag: [t.meta, t.comment], color: lightgray },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: darkgray, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: white },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: lightgray },
  { tag: [t.processingInstruction, t.string, t.inserted], color: green },
  { tag: t.invalid, color: orange },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: lightgray }
]);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const contrast: Extension = [contrastTheme, contrastHighlightStyle];
