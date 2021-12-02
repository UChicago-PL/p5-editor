export default `
const Editor = {
  shapeToolbox: (cb) => {
    if (typeof cb === 'function' && (!parent || !parent.showingShapeToolbox)) cb()
  },
  slider: (min, max, val, step) => val
}
`;

export function strip(code) {
  return code
    .replace(/Editor\.slider\(([\d\s,]+)\)/, (match, args) => parseInt(args.split(',')[2]) || 0)
    .replace(/Editor\.shapeToolbox\((\s*\(\s*\)\s*=>\s*\{((\s|.)*)\}\s*)?\)/, (match, g1, g2) => g2);
}
