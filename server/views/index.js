export function renderIndex() {
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="keywords" content="p5.js, p5.js web editor, web editor, processing, code editor" />
      <meta name="description" content="A web editor for the UChicago Computer Science Course CMSC11111/MAAD21111." />
      <title>CS 111 Editor</title>
      ${
        process.env.NODE_ENV === 'production'
          ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />`
          : ''
      }
      <link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>
      <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
      <link rel='shortcut icon' href='https://raw.githubusercontent.com/processing/p5.js-website-OLD/master/favicon.ico' type='image/x-icon' / >
      <script>
        if (!window.process) {
          window.process = {};
        }
        if (!window.process.env) {
          window.process.env = {};
        }
        window.process.env.API_URL = '${process.env.API_URL}';
        window.process.env.NODE_ENV = '${process.env.NODE_ENV}';
        window.process.env.S3_BUCKET = '${process.env.S3_BUCKET}';
        window.process.env.S3_BUCKET_URL_BASE = ${
          process.env.S3_BUCKET_URL_BASE ? `'${process.env.S3_BUCKET_URL_BASE}'` : undefined
        };
        window.process.env.AWS_REGION = '${process.env.AWS_REGION}';
        window.process.env.FORCE_TO_HTTPS = ${process.env.FORCE_TO_HTTPS === 'false' ? false : undefined};
        window.process.env.CLIENT = true;
        window.process.env.LOGIN_ENABLED = ${process.env.LOGIN_ENABLED === 'false' ? false : true};
        window.process.env.EXAMPLES_ENABLED = ${process.env.EXAMPLES_ENABLED === 'false' ? false : true};
        window.process.env.UI_ACCESS_TOKEN_ENABLED = ${
          process.env.UI_ACCESS_TOKEN_ENABLED === 'false' ? false : true
        };
        window.process.env.UI_COLLECTIONS_ENABLED = ${
          process.env.UI_COLLECTIONS_ENABLED === 'false' ? false : true
        };
        window.process.env.UPLOAD_LIMIT = ${
          process.env.UPLOAD_LIMIT ? `${process.env.UPLOAD_LIMIT}` : undefined
        };
        window.process.env.MOBILE_ENABLED = ${
          process.env.MOBILE_ENABLED ? `${process.env.MOBILE_ENABLED}` : undefined
        };
        window.process.env.TRANSLATIONS_ENABLED = ${
          process.env.TRANSLATIONS_ENABLED === 'true' ? true : false
        }; 

      </script>
    </head>
    <body>
      <div id="root" class="root-app">
      </div>
      <script async defer data-website-id="0992c58e-d497-4d16-ae2b-de39bb09136a" src="https://tan-lytics.herokuapp.com/umami.js"></script>
      <script src='${
        process.env.NODE_ENV === 'production' ? `${assetsManifest['/app.js']}` : '/app.js'
      }'></script>
      <script type="application/javascript">
        if (!location.href.includes('localhost') && location.protocol !== 'https:') {
           location.replace('https:' + location.href.substring(location.protocol.length));
        }
      </script>
    </body>
  </html>
  `;
}
