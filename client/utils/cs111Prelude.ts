import * as acorn from 'acorn';
import { walk } from 'estree-walker';
import { attachComments } from './estree-attach-comments';
import * as recast from 'recast';

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
function prepareCode(code) {
  const comments = [];
  const ast = acorn.parse(code, {
    ...acorn.defaultOptions,
    ecmaVersion: 'latest',
    onComment: comments
  });
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node.type === 'BlockStatement') {
        const children: any[] = [];
        // loop across the children of a block state, finding any places where there are shape toolboxes
        for (let idx = 0; idx < node.body.length; idx++) {
          const childNode = node.body[idx];
          // when you find some put em in a new children array
          if (nodeIsShapeToolbox(childNode)) {
            const args = childNode?.expression?.arguments;
            const contents = args && args.length && args[0]?.body?.body;
            if (contents && contents.length) {
              contents.forEach((x) => children.push(x));
            } else {
              // also put the other non stbs in there
              children.push(childNode);
            }
          } else {
            children.push(childNode);
          }
        }
        // then dump em back up
        node.body = children;
      }

      const isSlider =
        node?.type === 'CallExpression' &&
        node?.callee?.object?.name === 'Editor' &&
        node?.callee?.property?.name === 'slider';
      if (isSlider) {
        this.replace(node.arguments[2]);
        this.skip();
      }
    }
  });
  attachComments(ast, comments);
  const result = recast.print(ast).code;
  return result;
  // return generate(attachComments(ast, comments), { comment: true });
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

export function strip(code: string) {
  try {
    return prepareCode(code);
  } catch (e) {
    console.log(e);
    return code;
  }
}
