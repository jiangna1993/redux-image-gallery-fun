var webpack = require('webpack')
var validator = require('webpack-validator')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var template = require('html-webpack-template')
var NpmInstallWebpackPlugin = require('npm-install-webpack-plugin')

/*Define absolute paths for both entry and output directories*/
var SRC_PATH = path.resolve('./src')
var DIST_PATH = path.resolve('./dist')

var config = {
  entry: path.join(SRC_PATH, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_PATH,
    publicPath: '/dist/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: SRC_PATH
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: SRC_PATH,
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    stats: 'errors-only',
    contentBase: DIST_PATH,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: template,
      mobile: true,
      title: 'Redux Saga Image Gallery',
      // baseHref: 'http://localhost',
      // devServer: 3000,
      appMountId: 'root'
    })
  ]
}

module.exports = validator(config)
