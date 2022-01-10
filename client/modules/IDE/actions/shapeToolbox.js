import * as acorn from 'acorn';
import { dispatchConsoleEvent } from './console';

const generateFuncCallCode = ([name, args]) => {
  return `${name}(${args.join(', ')})`;
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

function chToLine(code, ch) {
  return [...code.slice(0, ch)].filter((c) => c === '\n').length;
}

export function processExistingCode(code, startLine, dispatch) {
  if (code) {
    let ast;
    try {
      ast = acorn.parse(code, { ...acorn.defaultOptions, ecmaVersion: 'latest' });
    } catch (e) {
      return null;
    }

    const reportError = (msg) =>
      dispatch(
        dispatchConsoleEvent([
          {
            method: 'log',
            data: [msg]
          }
        ])
      );

    const reportCodeError = (syntaxVals, msg) => {
      const lineNumbers = syntaxVals.map((val) => chToLine(code, val.start) + startLine);
      reportError(
        msg + '\n\nProblem line' + (lineNumbers.length === 1 ? '' : 's') + ': ' + lineNumbers.join(', ')
      );
    };

    const blockStatement = ast.body[0];
    if (blockStatement?.type === 'BlockStatement') {
      const nonExpressions = blockStatement.body.filter(
        (o) => o.type !== 'ExpressionStatement' || o.expression.type !== 'CallExpression'
      );
      if (!nonExpressions.length) {
        const args = blockStatement.body.map((o) => o.expression.arguments);

        const nonNumberVals = args.flat().filter((a) => a.type !== 'Literal' || typeof a.value !== 'number');

        if (!nonNumberVals.length) {
          return blockStatement.body.map((o) => [
            o.expression.callee.name,
            o.expression.arguments.map((arg) => arg.value)
          ]);
        } else {
          reportCodeError(
            nonNumberVals,
            'Shape toolbox code may only contain p5 function calls that pass number literals as arguments.'
          );
        }
      } else {
        reportCodeError(
          nonExpressions,
          'Shape toolbox code may only contain p5 function calls, and cannot include other structures like variable declarations, if statements, or for loops.'
        );
      }
    } else {
      reportError('The shape toolbox argument must be a lambda with a block body.');
    }
    return null;
  }
  return [];
}
