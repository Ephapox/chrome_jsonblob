const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    "event-page": "./src/event-page",
    "content-script": "./src/content-script",
    "app": "./src/components/app.jsx"
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'menu.html',
      template: 'html!src/templates/menu.html',
      chunks: ['app']
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'url-loader'
      },
      {
        test: /.(jsx|js)$/,
        exclude: 'node_modules',
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  }
}
