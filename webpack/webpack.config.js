const webpack = require('webpack')
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const less = require('./less-loader')
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
} = require('webpack-blocks')

module.exports = createConfig([
  entryPoint('./src/js/app.es6'),
  setOutput('./build/bundle.js'),
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
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    })
  ])
])