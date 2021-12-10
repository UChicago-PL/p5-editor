// TODO: NEED TO GET THE USING EDITOR SLIDER

const appWidgetState: { [x: string]: boolean } = {
  showBoolWidgets: false,
  showNumWidgets: false,
  showColorWidgets: true,
  showShapeWidgets: false,
  liveMode: false,
  usingEditorSlider: false
};

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

interface EventConfig {
  eventName: string;
  context?: string[];
}

export function wrapEvent(wrapped: (x: any) => any, eventConfig: EventConfig) {
  // todo add validation
  if (!eventConfig.eventName) {
    console.log('invalid log event', eventConfig);
    return;
  }

  const eventName = prepName(eventConfig);
  return function (e: any) {
    console.log(eventName);
    // @ts-ignore
    umami.trackEvent(appSettingsToIndex(), eventConfig.eventName);
    wrapped(e);
  };
}

export function trackEvent(eventConfig: EventConfig) {
  // @ts-ignore
  umami.trackEvent(appSettingsToIndex(), eventConfig.eventName);
}
