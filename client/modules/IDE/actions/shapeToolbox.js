import * as acorn from 'acorn';
import { dispatchConsoleEvent } from './console';

const generateFuncCallCode = ([name, args]) => {
  return `${name}(${args.join(',')})`;
};

export function applyShapeToolbox(code, calls, [from, to]) {
  const splitCode = code.substring(0, from).split('\n');
  const prevLine = splitCode[splitCode.length - 1];
  const indent = prevLine.match(/\s*/g)[0];
  const lines = calls.map(generateFuncCallCode);
  const body = lines.map((line) => indent + '  ' + line + ';').join('\n');
  return (
    code.substring(0, from) +
    'Editor.shapeToolbox(() => {\n' +
    body +
    '\n' +
    indent +
    '})' +
    code.substring(to)
  );
}

export function processExistingCode(code, dispatch) {
  if (code) {
    let ast;
    try {
      ast = acorn.parse(code, { ...acorn.defaultOptions, ecmaVersion: 'latest' });
    } catch (e) {
      return null;
    }
    const blockStatement = ast.body[0];
    if (blockStatement?.type === 'BlockStatement') {
      if (
        blockStatement.body.every(
          (o) => o.type === 'ExpressionStatement' && o.expression.type === 'CallExpression'
        )
      ) {
        const args = blockStatement.body.map((o) => o.expression.arguments);
        if (args.flat().every((a) => a.type === 'Literal' && typeof a.value === 'number')) {
          return blockStatement.body.map((o) => [
            o.expression.callee.name,
            o.expression.arguments.map((arg) => arg.value)
          ]);
        }
      }
    }

    dispatch(
      dispatchConsoleEvent([
        {
          method: 'log',
          data: [
            'Shape toolbox code may consist only of p5 function calls that pass number literals as arguments.'
          ]
        }
      ])
    );
    return null;
  }
  return [];
}
