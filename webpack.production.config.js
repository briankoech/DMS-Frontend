(() => {
  'use strict';

  var webpack = require('webpack');
  var path = require('path');
  let buildPath = path.resolve(__dirname, 'public');
  var nodeModulesPath = path.resolve(__dirname, 'node_modules');
  let pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');
  let pathToReactDOM = path.resolve(
    nodeModulesPath,
    'react-dom/dist/react-dom.min.js');
  let mainPath = path.resolve(__dirname, 'app', 'main.js');

  var config = {
    entry: [mainPath],
    target: 'web',
    // Render source-map file for final build
    devtool: 'source-map',
    // output config
    output: {
      path: buildPath, // Path of output file
      filename: 'main.js', // Name of output file
      publicPath: '/public/'
    },
    plugins: [
      // Minify the bundle
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // supresses warnings, usually from module minification
          warnings: false
        }
      }),
      // Allows error warnings but does not stop compiling. Will remove when eslint is added
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loader: 'babel-loader',
        exclude: [nodeModulesPath]
      }, {
        test: /\.css?$/,
        include: path.join(__dirname, 'app'),
        exclude: [nodeModulesPath],
        loader: 'style-loader!css-loader'
      }],
      noParse: [pathToReact]
    }
  };

  module.exports = config;
})();
