import { Completion, snippetCompletion as snip } from '@codemirror/autocomplete';
const words = {
  // constants
  P2D: false,
  WEBGL: false,
  ARROW: false,
  CROSS: false,
  HAND: false,
  MOVE: false,
  TEXT: false,
  WAIT: false,
  HALF_PI: true,
  PI: true,
  QUARTER_PI: true,
  TAU: true,
  TWO_PI: true,
  DEGREES: true,
  RADIANS: true,
  CORNER: true,
  CORNERS: true,
  RADIUS: true,
  RIGHT: true,
  LEFT: true,
  CENTER: true,
  TOP: true,
  BOTTOM: true,
  BASELINE: true,
  POINTS: true,
  LINES: true,
  LINE_STRIP: true,
  LINE_LOOP: true,
  TRIANGLES: true,
  TRIANGLE_FAN: true,
  TRIANGLE_STRIP: true,
  QUADS: true,
  QUAD_STRIP: true,
  TESS: true,
  CLOSE: true,
  OPEN: true,
  CHORD: true,
  PIE: true,
  PROJECT: true,
  SQUARE: true,
  ROUND: true,
  BEVEL: true,
  MITER: true,
  RGB: true,
  HSB: true,
  HSL: true,
  AUTO: true,
  ALT: true,
  BACKSPACE: true,
  CONTROL: true,
  DELETE: true,
  DOWN_ARROW: true,
  ENTER: true,
  ESCAPE: true,
  LEFT_ARROW: true,
  OPTION: true,
  RETURN: true,
  RIGHT_ARROW: true,
  SHIFT: true,
  TAB: true,
  UP_ARROW: true,
  BLEND: false,
  REMOVE: false,
  ADD: false,
  DARKEST: false,
  LIGHTEST: false,
  DIFFERENCE: false,
  SUBTRACT: false,
  EXCLUSION: false,
  MULTIPLY: false,
  SCREEN: false,
  REPLACE: false,
  OVERLAY: false,
  HARD_LIGHT: false,
  SOFT_LIGHT: false,
  DODGE: false,
  BURN: false,
  THRESHOLD: false,
  GRAY: false,
  OPAQUE: false,
  INVERT: false,
  POSTERIZE: false,
  DILATE: false,
  ERODE: false,
  BLUR: false,
  NORMAL: true,
  ITALIC: true,
  BOLD: true,
  BOLDITALIC: true,
  LINEAR: false,
  QUADRATIC: false,
  BEZIER: false,
  CURVE: false,
  STROKE: false,
  FILL: false,
  TEXTURE: false,
  IMMEDIATE: false,
  IMAGE: false,
  NEAREST: false,
  REPEAT: false,
  CLAMP: false,
  MIRROR: false,
  LANDSCAPE: false,
  PORTRAIT: false,
  GRID: false,
  AXES: false,
  frameCount: true,
  deltaTime: true,
  focused: false,
  displayWidth: false,
  displayHeight: false,
  windowWidth: false,
  windowHeight: false,
  width: true,
  height: true,
  disableFriendlyErrors: false,
  drawingContext: false,
  VIDEO: false,
  AUDIO: false,
  deviceOrientation: false,
  accelerationX: false,
  accelerationY: false,
  accelerationZ: false,
  pAccelerationX: false,
  pAccelerationY: false,
  pAccelerationZ: false,
  rotationX: false,
  rotationY: false,
  rotationZ: false,
  pRotationX: false,
  pRotationY: false,
  pRotationZ: false,
  turnAxis: false,
  keyIsPressed: true,
  key: true,
  keyCode: true,
  movedX: true,
  movedY: true,
  mouseX: true,
  mouseY: true,
  pmouseX: true,
  pmouseY: true,
  winMouseX: true,
  winMouseY: true,
  pwinMouseX: true,
  pwinMouseY: true,
  mouseButton: true,
  mouseIsPressed: true,
  touches: false,
  pixels: false,
  alpha: true,
  blue: true,
  brightness: true,
  color: true,
  green: true,
  hue: true,
  lerpColor: true,
  lightness: true,
  red: true,
  saturation: true,
  background: true,
  clear: true,
  colorMode: true,
  fill: true,
  noFill: true,
  noStroke: true,
  stroke: true,
  erase: true,
  noErase: true,
  arc: true,
  ellipse: true,
  circle: true,
  line: true,
  point: true,
  quad: true,
  rect: true,
  square: true,
  triangle: true,
  ellipseMode: true,
  noSmooth: true,
  rectMode: true,
  smooth: true,
  strokeCap: true,
  strokeJoin: true,
  strokeWeight: true,
  bezier: true,
  bezierDetail: true,
  bezierPoint: true,
  bezierTangent: true,
  curve: true,
  curveDetail: true,
  curveTightness: true,
  curvePoint: true,
  curveTangent: true,
  beginContour: true,
  beginShape: true,
  bezierVertex: true,
  curveVertex: true,
  endContour: true,
  endShape: true,
  quadraticVertex: true,
  vertex: true,
  print: true,
  cursor: false,
  frameRate: true,
  noCursor: false,
  windowResized: false,
  fullscreen: false,
  pixelDensity: false,
  displayDensity: false,
  getURL: false,
  getURLPath: false,
  getURLParams: false,
  preload: true,
  setup: true,
  draw: true,
  remove: false,
  createCanvas: true,
  resizeCanvas: true,
  noCanvas: true,
  createGraphics: false,
  blendMode: false,
  noLoop: true,
  loop: true,
  push: true,
  pop: true,
  redraw: true,
  p5: true,
  applyMatrix: true,
  resetMatrix: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  rotateZ: true,
  scale: true,
  shearX: true,
  shearY: true,
  translate: true,
  storeItem: true,
  getItem: true,
  clearStorage: true,
  removeItem: true,
  createStringDict: false,
  createNumberDict: false,
  select: false,
  selectAll: false,
  removeElements: false,
  changed: false,
  input: false,
  createDiv: false,
  createP: false,
  createSpan: false,
  createImg: false,
  createA: false,
  createSlider: false,
  createButton: false,
  createCheckbox: false,
  createSelect: false,
  createRadio: false,
  createColorPicker: false,
  createInput: false,
  createFileInput: false,
  createVideo: false,
  createAudio: false,
  createCapture: false,
  createElement: false,
  setMoveThreshold: false,
  setShakeThreshold: false,
  deviceMoved: false,
  deviceTurned: false,
  deviceShaken: false,
  keyPressed: true,
  keyReleased: true,
  keyTyped: true,
  keyIsDown: true,
  mouseMoved: true,
  mouseDragged: true,
  mousePressed: true,
  mouseReleased: true,
  mouseClicked: true,
  doubleClicked: true,
  mouseWheel: false,
  requestPointerLock: false,
  exitPointerLock: false,
  touchStarted: false,
  touchMoved: false,
  touchEnded: false,
  createImage: true,
  saveCanvas: true,
  saveFrames: true,
  loadImage: true,
  image: true,
  tint: false,
  noTint: false,
  imageMode: false,
  blend: false,
  copy: false,
  filter: false,
  get: true,
  loadPixels: true,
  set: true,
  updatePixels: true,
  loadJSON: false,
  loadStrings: false,
  loadTable: false,
  loadXML: false,
  loadBytes: false,
  httpGet: false,
  httpPost: false,
  httpDo: false,
  createWriter: false,
  save: false,
  saveJSON: false,
  saveStrings: false,
  saveTable: false,
  abs: true,
  ceil: true,
  constrain: true,
  dist: true,
  exp: true,
  floor: true,
  lerp: true,
  log: true,
  mag: true,
  map: true,
  max: true,
  min: true,
  norm: true,
  pow: true,
  round: true,
  sq: true,
  sqrt: true,
  fract: true,
  createVector: true,
  noise: false,
  noiseDetail: false,
  noiseSeed: false,
  randomSeed: false,
  random: true,
  randomGaussian: false,
  acos: true,
  asin: true,
  atan: true,
  atan2: true,
  cos: true,
  sin: true,
  tan: true,
  degrees: true,
  radians: true,
  angleMode: true,
  textAlign: true,
  textLeading: true,
  textSize: true,
  textStyle: true,
  textWidth: true,
  textAscent: true,
  textDescent: true,
  loadFont: true,
  text: true,
  textFont: true,
  append: true,
  arrayCopy: true,
  concat: true,
  reverse: true,
  shorten: true,
  shuffle: true,
  sort: true,
  splice: true,
  subset: true,
  float: true,
  int: true,
  str: true,
  boolean: true,
  byte: true,
  char: true,
  unchar: true,
  hex: true,
  unhex: true,
  join: true,
  match: true,
  matchAll: true,
  nf: true,
  nfc: true,
  nfp: true,
  nfs: true,
  split: true,
  splitTokens: true,
  trim: true,
  day: true,
  hour: true,
  minute: true,
  millis: true,
  month: true,
  second: true,
  year: true,
  plane: false,
  box: false,
  sphere: false,
  cylinder: false,
  cone: false,
  ellipsoid: false,
  torus: false,
  orbitControl: false,
  debugMode: false,
  noDebugMode: false,
  ambientLight: false,
  specularColor: false,
  directionalLight: false,
  pointLight: false,
  lights: false,
  lightFalloff: false,
  spotLight: false,
  noLights: false,
  loadModel: false,
  model: false,
  loadShader: false,
  createShader: false,
  shader: false,
  resetShader: false,
  normalMaterial: false,
  texture: false,
  textureMode: false,
  textureWrap: false,
  ambientMaterial: false,
  emissiveMaterial: false,
  specularMaterial: false,
  shininess: false,
  camera: false,
  perspective: false,
  ortho: false,
  frustum: false,
  createCamera: false,
  setCamera: false,
  setAttributes: false,
  sampleRate: false,
  freqToMidi: false,
  midiToFreq: false,
  soundFormats: false,
  getAudioContext: false,
  userStartAudio: false,
  loadSound: false,
  createConvolver: false,
  setBPM: false,
  saveSound: false
};
const preppedWords = Object.entries(words)
  .filter((x) => x[1])
  .map(([word]) => word);

export default preppedWords;

/// A collection of JavaScript-related
export const snippets: readonly Completion[] = [
  snip('Editor.slider(${_minVal}, ${_maxVal}, ${_curVal});', {
    label: 'Editor.slider',
    detail: 'Editor slider',
    type: 'keyword'
  }),
  snip('Editor.shapeToolbox();', {
    label: 'Editor.shapeToolbox',
    detail: 'Editor shapeToolbox',
    type: 'keyword'
  }),
  snip('const ${_varName} = ${_value};', {
    label: 'const',
    detail: 'variable definition',
    type: 'keyword'
  }),
  snip('let ${_varName} = ${_value};', {
    label: 'let',
    detail: 'variable definition',
    type: 'keyword'
  }),
  snip('if (${_condition}){\n\t${}\n}}', {
    label: 'if',
    detail: 'if statement',
    type: 'keyword'
  }),
  snip('if (${_condition}){\n\t${}\n}} else {\n\t${}\n}', {
    label: 'if',
    detail: 'if else statement',
    type: 'keyword'
  }),
  snip('if (${_condition}){\n\t${}\n}} if (${_condition}) else {\n\t${}\n} else {\n\t${}\n}', {
    label: 'if',
    detail: 'if else-if else statement',
    type: 'keyword'
  }),
  snip('function ${_name}(${_params}) {\n\t${}\n}', {
    label: 'function',
    detail: 'definition',
    type: 'keyword'
  }),
  snip('for (let ${_index} = 0; ${_index} < ${_bound}; ${_index}++) {\n\t${}\n}', {
    label: 'for',
    detail: 'loop',
    type: 'keyword'
  }),
  snip('for (let ${_name} of ${_collection}) {\n\t${}\n}', {
    label: 'for',
    detail: 'of loop',
    type: 'keyword'
  }),
  snip('for (let ${_name} in ${_collection}) {\n\t${}\n}', {
    label: 'for',
    detail: 'in loop (fields of an object)',
    type: 'keyword'
  }),
  snip('while (${_condition}) {\n\t${}\n}', {
    label: 'while',
    detail: 'while loop',
    type: 'keyword'
  }),
  snip('try {\n\t${}\n} catch (${_error}) {\n\t${}\n}', {
    label: 'try',
    detail: 'block',
    type: 'keyword'
  }),
  snip('class ${_name} {\n\tconstructor(${_params}) {\n\t\t${}\n\t}\n}', {
    label: 'class',
    detail: 'definition',
    type: 'keyword'
  })
  // snip('import {${_names}} from "${module}"\n${}', {
  //   label: 'import',
  //   detail: 'named',
  //   type: 'keyword'
  // }),
  // snip('import ${_name} from "${module}"\n${}', {
  //   label: 'import',
  //   detail: 'default',
  //   type: 'keyword'
  // })
];
