const appWidgetState: { [x: string]: boolean } = {
  showBoolWidgets: false,
  showNumWidgets: false,
  showColorWidgets: true,
  showShapeWidgets: false,
  liveMode: false,
  usingEditorSlider: false
};

interface EventConfig {
  eventName: string;
  context?: string[];
}

export const setGlobalTrack = (key: string, value: boolean) => {
  appWidgetState[key] = value;
};

const appSettingsToIndex = () => {
  // not doing anything clever with obj vals to make sure the order is consistent
  const binRep = [
    appWidgetState.showBoolWidgets,
    appWidgetState.showNumWidgets,
    appWidgetState.showColorWidgets,
    appWidgetState.liveMode,
    appWidgetState.usingEditorSlider
  ]
    .map((v) => (v ? 1 : 0))
    .join('');
  return `${parseInt(binRep, 2)}`;
};

const prepName = (eventConfig: EventConfig) =>
  eventConfig.context && eventConfig.context.length
    ? `${eventConfig.context.join('|')}|${appSettingsToIndex()}`
    : `${appSettingsToIndex()}`;

export function wrapEvent(wrapped: (x: any) => any, eventConfig: EventConfig) {
  if (!eventConfig.eventName) {
    console.log('invalid log event', eventConfig);
    return;
  }

  return function (e: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    umami.trackEvent(prepName(eventConfig), eventConfig.eventName);
    wrapped(e);
  };
}

export function trackEvent(eventConfig: EventConfig) {
  // todo add validation
  if (!eventConfig.eventName) {
    console.log('invalid log event', eventConfig);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  umami.trackEvent(prepName(eventConfig), eventConfig.eventName);
}

/**
 * List of the friendly errors from p5 distilled down to fragments
 * used by the function below to try to identify one based on the p5
 */
const pairs = [
  ['The media that tried to play', 'autoplay'],
  ["Please correct it if it's not intentional.", 'checkUserDefinedFns'],
  ['It looks like there was a problem loading your file.', 'fileLoadError:bytes'],
  ['It looks like there was a problem loading your font.', 'fileLoadError:font'],
  [
    'There was some trouble loading your GIF. Make sure that your GIF is using 87a or 89a encoding.',
    'fileLoadError:gif'
  ],
  ['It looks like there was a problem loading your image.', 'fileLoadError:image'],
  ['It looks like there was a problem loading your JSON file.', 'fileLoadError:json'],
  [
    "If your large file isn't fetched successfully, we recommend splitting the file into smaller segments and fetching those.",
    'fileLoadError:large'
  ],
  ['It looks like there was a problem loading your text file.', 'fileLoadError:strings'],
  [
    'is correct, hosting the file online, or running a local server. (More info at ',
    'fileLoadError:suggestion'
  ],
  ['It looks like there was a problem loading your table file.', 'fileLoadError:table'],
  ['It looks like there was a problem loading your XML file.', 'fileLoadError:xml'],
  ['If not intentional, this is often a problem with scope: ', 'type_EMPTY_VAR'],
  [' arguments, but received only ', 'type_TOO_FEW_ARGUMENTS'],
  ['() was expecting no more than ', 'type_TOO_MANY_ARGUMENTS'],
  ['() was expecting ', 'type_WRONG_TYPE'],

  [' not being defined in the current scope ', 'refNotDefined'],
  [' Called from line ', 'stackSubseq'],
  [' Error at line ', 'stackTop'],
  [
    "There's a syntax error due to a symbol that JavaScript doesn't recognize or didn't expect at its place.\nFor more",
    'invalidToken'
  ],
  [
    "There's a syntax error due to a symbol that wasn't expected at its place.\nUsually this is due to a typo. Check the line number in the error below for anything missing/extra.",
    'unexpectedToken'
  ],
  [
    'Check the spelling, letter-casing (JavaScript is case-sensitive) and its type.\nFor more: ',
    'typeNotfunc'
  ],
  [
    ' in it and check the spelling, letter-casing (JavaScript is case-sensitive) and its type.\nFor more:',
    'typeNotfuncObj'
  ],

  ['If not stated otherwise, it might be an issue with the arguments passed to', 'libraryError'],
  ['Please correct it to', 'misspelling'],
  ['You may have meant one of the following:', 'misspelling_plural'],
  [
    "? If so, you may want to move it into your sketch's setup() function.\n\nFor more details",
    'misusedTopLevel'
  ],

  [
    'Nothing besides load calls (loadImage, loadJSON, loadFont, loadStrings, etc.) should be inside the preload function.',
    'wrongPreload'
  ]
];

export const simplep5Mesg = (msg: string) => {
  const result = pairs.find(([comparator]) => msg.includes(comparator));
  return result ? result[1] : undefined;
};
