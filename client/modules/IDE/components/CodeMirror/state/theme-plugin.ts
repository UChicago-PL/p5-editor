import { Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { closeBrackets } from '@codemirror/closebrackets';
import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import { contrastTheme, contrastHighlightStyle } from './themes/contrast-theme';

export interface ThemeConfig {
  autocomplete?: boolean;
  autocloseBracketsQuotes?: boolean;
  theme?: string;
  linewrap?: boolean;
  fontSize?: number;
}

const lineWrappingConfig = new Compartment();
const bracketsConfig = new Compartment();
const fontSizeConfig = new Compartment();
const themeConfig = new Compartment();
const syntaxThemeConfig = new Compartment();

const createFontSizeTheme = (fontSize) =>
  EditorView.theme({
    '&': {
      fontSize: `${fontSize}px`
    }
  });

const getTheme = (themeName: string) => {
  if (themeName === 'dark') {
    return oneDarkTheme;
  } else if (themeName === 'contrast') {
    return contrastTheme;
  } else {
    return [];
  }
};

const getSyntaxTheme = (themeName: string) => {
  if (themeName === 'dark') {
    return oneDarkHighlightStyle;
  } else if (themeName === 'contrast') {
    return contrastHighlightStyle;
  } else {
    return [];
  }
};

export function setTheme(view: EditorView, theme: ThemeConfig) {
  view.dispatch({
    effects: [
      lineWrappingConfig.reconfigure(theme.linewrap ? EditorView.lineWrapping : []),
      bracketsConfig.reconfigure(theme.autocloseBracketsQuotes ? closeBrackets() : []),
      fontSizeConfig.reconfigure(createFontSizeTheme(theme.fontSize || 18)),
      themeConfig.reconfigure(getTheme(theme.theme || 'default')),
      syntaxThemeConfig.reconfigure(getSyntaxTheme(theme.theme || 'default'))
    ]
  });
}

export function themePlugin(theme: ThemeConfig) {
  return [
    lineWrappingConfig.of(theme.linewrap ? EditorView.lineWrapping : []),
    bracketsConfig.of(theme.autocloseBracketsQuotes ? closeBrackets() : []),
    fontSizeConfig.of(createFontSizeTheme(theme.fontSize || 18)),
    themeConfig.of(getTheme(theme.theme || 'default')),
    syntaxThemeConfig.of(getSyntaxTheme(theme.theme || 'default'))
  ];
}
