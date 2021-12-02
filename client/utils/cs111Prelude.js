export default `
const Editor = {
  shapeToolbox: (cb) => {
    if (typeof cb === 'function' && (!parent || !parent.showingShapeToolbox)) cb()
  },
  slider: (min, max, val, step) => val
}
`;
