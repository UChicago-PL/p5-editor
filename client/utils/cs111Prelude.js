export default `
function shapeToolbox(cb) {
  if (typeof cb === 'function' && (!parent || !parent.showingShapeToolbox)) cb()
}
function _slider(min, max, val, step) { return val }
`;
