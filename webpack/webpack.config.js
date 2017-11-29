const webpack = require('webpack')
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const less = require('./less-loader');
const {
  createConfig,
  match,
  babel,
  css,
  postcss,
  devServer,
  uglify,
  file,
  addPlugins,
  entryPoint,
  env,
  setOutput,
  sourceMaps
} = require('webpack-blocks');
const TARGET = process.env.npm_lifecycle_event;
let templatePath;

if (TARGET ===  'start') {
  templatePath = './index.html';
}

if (TARGET === 'build') {
  templatePath = '../index.html';
}

module.exports = createConfig([
  entryPoint('./src/js/app.es6'),
  setOutput('./build/[name].js'),
  match(/\.(js|es6)$/, { exclude: path.resolve('node_modules') }, [
    babel()
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp'], [
    file()
  ]),
  less(),
  env('development', [
    devServer(),
    sourceMaps()
  ]),
  env('production', [
    uglify(),
    addPlugins([
      new webpack.LoaderOptionsPlugin({minimize: true})
    ])
  ]),
  addPlugins([
    new WebpackCleanupPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new HtmlWebpackPlugin({
      inject: true,
      filename: templatePath,
      template: './src/index.html'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ])
])