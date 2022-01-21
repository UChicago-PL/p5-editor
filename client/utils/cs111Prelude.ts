import * as acorn from 'acorn';
import { walk } from 'estree-walker';
import { generate } from 'escodegen';
// const walk = require('estree-walker').walk;

export default `
const Editor = {
  shapeToolbox: (cb) => {
    if (typeof cb === 'function') cb()
  },
  slider: (min, max, val, step) => val
}
`;

const nodeIsShapeToolbox = (node) =>
  node?.type === 'ExpressionStatement' &&
  node?.expression?.callee?.object?.name === 'Editor' &&
  node?.expression?.callee?.property?.name === 'shapeToolbox';
export function strip(code) {
  const ast = acorn.parse(code, { ...acorn.defaultOptions, ecmaVersion: 'latest' });
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node.type === 'BlockStatement') {
        for (let idx = 0; idx < node.body.length; idx++) {
          const childNode = node.body[idx];
          if (nodeIsShapeToolbox(childNode)) {
            console.log(childNode.expression.arguments);
          }
        }
      }

      // if (isShapeToolbox) {
      //   console.log('replacement stb');
      //   console.log(parent);
      //   // console.log(node);
      //   // console.log(parent);
      //   // this.replace(node.arguments[0].body.body);
      //   this.skip();
      //   return;
      // }
      const isSlider =
        node?.type === 'CallExpression' &&
        node?.callee?.object?.name === 'Editor' &&
        node?.callee?.property?.name === 'slider';
      if (isSlider) {
        // console.log('is slider', node.arguments[2]);
        this.replace(node.arguments[2]);
        this.skip();
      }
    }
  });
  console.log(generate(ast));
  return generate(ast);
  // return (
  //   code
  //     .replaceAll(/Editor\.slider\(([\d\s,]+)\)/g, (match, args) => parseInt(args.split(',')[2]) || 0)
  //     // .replaceAll(/Editor\.shapeToolbox\((\s*\(\s*\)\s*=>\s*\{((\s|.)*)\}\s*)?\)/g, (match, g1, g2) => g2);
  //     .replaceAll(/Editor\.shapeToolbox\((\s*\(\s*\)\s*=>\s*\{((\s|.)*)\}\s*)?\)/g, (match, g1, g2) => {
  //       console.log(g2);
  //       return g2;
  //     })
  // );
}
