import * as acorn from 'acorn';
import { dispatchConsoleEvent } from './console';

export function applyShapeToolbox(code, lines, [from, to]) {
  const splitCode = code.substring(0, from).split('\n');
  const prevLine = splitCode[splitCode.length - 1];
  const indent = prevLine.match(/\s*/g)[0];
  const body = lines.map((line) => indent + '  ' + line + (line.slice(-1) === ';' ? '' : ';')).join('\n');
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

const shapeToolboxP5Functions = ['line', 'rect', 'circle', 'ellipse', 'triangle', 'quad', 'bezier'];

export function processExistingCode(code, startLine, dispatch) {
  if (code) {
    let ast;
    try {
      ast = acorn.parse(code, { ...acorn.defaultOptions, ecmaVersion: 'latest' });
    } catch (e) {
      // If there's a syntax error then this will be caught by the linter anyway
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

    const reportCodeError = (problemLines, msg) => {
      const lineNumbers = problemLines.map((line) => line + startLine);
      reportError(
        msg +
          '\n\nProblem line' +
          (lineNumbers.length === 1 ? '' : 's') +
          ': ' +
          lineNumbers.join(', ') +
          '\n'
      );
    };

    const blockStatement = ast.body[0];
    if (blockStatement?.type === 'BlockStatement') {
      const nonExpressions = blockStatement.body.filter(
        (o) => o.type !== 'ExpressionStatement' || o.expression.type !== 'CallExpression'
      );
      if (!nonExpressions.length) {
        const lines = blockStatement.body.map((o) => {
          const {
            callee: { name },
            arguments: args
          } = o.expression;
          if (shapeToolboxP5Functions.includes(name)) {
            if (args.some((a) => a.type !== 'Literal' || typeof a.value !== 'number')) {
              return null;
            } else {
              return [name, args.map((arg) => arg.value)];
            }
          } else {
            return code.slice(o.start, o.end);
          }
        });

        const invalidCalls = lines.map((v, i) => [v, i]).filter(([line, i]) => line === null);

        if (!invalidCalls.length) {
          return lines;
        } else {
          reportCodeError(
            invalidCalls.map(([line, i]) => i + 1),
            'Any p5 function calls in shape toolbox code can only have number literals as arguments, and cannot have variables or values of other types.'
          );
        }
      } else {
        reportCodeError(
          nonExpressions.map((val) => chToLine(code, val.start)),
          'Shape toolbox code may only contain function calls, and cannot include other structures like variable declarations, if statements, or for loops.'
        );
      }
    } else {
      reportError('The shape toolbox argument must be a lambda with a block body.');
    }
    return null;
  }
  return [];
}
