import { Router } from 'express';
import { ESLint } from 'eslint';
import { CSSLint } from 'csslint';
// const config = require('./end-user-lint-config.json');
// let config = {};

let linter = null;
let tempLinter = new ESLint();
tempLinter.calculateConfigForFile('./end-user-lint-config.json').then((x) => {
  console.log('config', x);
  linter = new ESLint({ allowInlineConfig: false, baseConfig: x });
});
// console.log(config);
// const linter = new ESLint();
const router = new Router();

function lintFile(req, res) {
  // linter not loaded yet
  if (!linter) {
    res.sendStatus(500);
  }
  const language = req?.body?.language;
  if (!language) {
    res.sendStatus(500);
    return;
  }
  const code = req?.body?.code || '';
  if (!code) {
    res.sendStatus(500);
    return;
  }
  if (language === 'css') {
    const msgs = CSSLint.verify(code).messages.map((e) => {
      return {
        message: e.message,
        severity: e.type,
        line: e.line
      };
    });
    res.json({ msgs });
  }
  linter
    // .lintText(code, { filePath: './end-user-lint-config.json' })
    .lintText(code)
    .then((msgs) => {
      if (!msgs || !msgs[0] || !Array.isArray(msgs[0].messages)) {
        res.sendStatus(500);
        return;
      }
      console.log({ msgs: msgs[0].messages });
      const formattedMsgs = msgs[0].messages.map((msg) => {
        const severity = msg.severity === 1 ? 'warning' : msg.severity === 2 ? 'error' : 'info';
        return {
          message: msg.message,
          severity,
          line: msg.line
        };
      });

      res.json({ msgs: formattedMsgs });
    })
    .catch((e) => {
      res.sendStatus(500);
      console.log('linting error', e);
    });
}

router.post('/lint-file/', lintFile);

export default router;
