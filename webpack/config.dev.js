const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const dist = require('./constants.js').dist;

// react hmr being fucked up has to do with the multiple entries!!! cool.
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: ['./client/index.jsx'],
    previewScripts: [path.resolve(__dirname, '../client/utils/previewEntry.js')]
  },
  output: {
    path: dist,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['client', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../translations/locales'), to: path.resolve(dist, 'locales') }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: [/node_modules/, /.+\.config.js/],
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noImplicitAny: false,
              target: 'es6',
              jsx: 'react',
              // moduleResolution: 'browser'
              moduleResolution: 'node'
            }
          }
        }
      },
      {
        test: [/main\.scss$/, /App\.scss$/, /\.css$/],
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.(mp3)$/, use: 'file-loader' },
      {
        test: /\.(png)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]', outputPath: 'images/' }
        }
      },
      {
        test: /fonts\/.*\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        oneOf: [
          { resourceQuery: /byContent/, use: 'raw-loader' },
          { resourceQuery: /byUrl/, use: 'file-loader' },
          {
            use: {
              loader: '@svgr/webpack',
              options: { svgoConfig: { plugins: { removeViewBox: false } } }
            }
          }
        ]
      },
      {
        test: /_console-feed.scss/,
        use: {
          loader: 'sass-extract-loader',
          options: {
            plugins: [{ plugin: 'sass-extract-js', options: { camelCase: false } }]
          }
        }
      }
    ]
  }
};
