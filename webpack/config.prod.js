const webpack = require('webpack');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const dist = require('./constants.js').dist;

module.exports = [
  {
    devtool: 'source-map',
    mode: 'production',
    entry: { app: ['@babel/polyfill', path.resolve(__dirname, '../client/index.jsx')] },
    output: { path: dist, filename: '[name].[hash].js', publicPath: '/' },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['client', 'node_modules']
    },
    module: {
      rules: [
        {
          test: /main\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  postcssFocus(),
                  cssnext({ browsers: ['last 2 versions', 'IE > 9'] }),
                  cssnano({ autoprefixer: false }),
                  postcssReporter({ clearMessages: true })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader' }]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(png)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        },
        {
          test: /\.mp3$/,
          use: 'file-loader'
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
        },
        {
          test: /classic.min.css/,
          use: {
            loader: 'sass-extract-loader',
            options: {
              plugins: [{ plugin: 'sass-extract-js', options: { camelCase: false } }]
            }
          }
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserJSPlugin({ sourceMap: true, parallel: true }), new OptimizeCSSAssetsPlugin()]
    },
    plugins: [
      new ManifestPlugin({ basePath: '/' }),
      new MiniCssExtractPlugin({ filename: 'app.[hash].css' }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, '../translations/locales'), to: path.resolve(dist, 'locales') }
        ]
      })
    ]
  },
  {
    entry: { app: [path.resolve(__dirname, '../client/utils/previewEntry.js')] },
    target: 'web',
    devtool: 'source-map',
    mode: 'production',
    output: {
      path: dist,
      filename: 'previewScripts.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      modules: ['client', 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader' }]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { babelrc: true }
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserJSPlugin({ sourceMap: true, parallel: true })]
    }
  }
];
