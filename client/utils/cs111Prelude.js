export default `
const Editor = {
  shapeToolbox: (cb) => {
    if (typeof cb === 'function') cb()
  },
  slider: (min, max, val, step) => val
}
`;

export const last = (arr) => arr[arr.length - 1];

export function injectPrelude(code) {
  const script = `<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/UChicago-PL/cs11111-assets/prelude.js" ></script>`;
  const splits = code.split('</head>');
  if (splits.length !== 2) {
    console.error('Prelude injection failed on \n', code);
    return code;
  }

  return `${splits[0]}\n${script}\n</head>${splits[1]}`;
}

export function strip(code) {
  return code
    .replace(/Editor\.slider\(([\d\s,]+)\)/, (match, args) => parseInt(args.split(',')[2]) || 0)
    .replace(/Editor\.shapeToolbox\((\s*\(\s*\)\s*=>\s*\{((\s|.)*)\}\s*)?\)/, (match, g1, g2) => g2);
}
