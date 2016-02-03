var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');


module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      mainPath, // ./app/main.js
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loader: 'react-hot!babel',
      exclude: [nodeModulesPath],
    }, {
      test: /\.css?$/,
      include: path.join(__dirname, 'app'),
      exclude: [nodeModulesPath],
      loader: 'style-loader!css-loader',
    }],
  },
};
