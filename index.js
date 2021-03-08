const { exec } = require('child_process');
if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/static/manifest.json'));
  exec('git branch --show-current', (err, stdout, stderr) => {
    if (err) {
      return;
    }
    process.env.BRANCH_NAME = `${stdout}`.trim();
  });
  require('./dist/server.bundle.js');
} else {
  let parsed = require('dotenv').config();
  require('@babel/register')({
    presets: ['@babel/preset-env']
  });
  require('@babel/polyfill');
  //// in development, let .env values override those in the environment already (i.e. in docker-compose.yml)
  // so commenting this out makes the docker container work.
  // if (process.env.NODE_ENV === 'development') {
  //   for (let key in parsed) {
  //     process.env[key] = parsed[key];
  //   }
  // }
  require('./server/server');
}
