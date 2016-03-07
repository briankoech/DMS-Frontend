var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      mainPath // ./app/main.js
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loader: 'react-hot!babel-loader',
      exclude: [nodeModulesPath]
    }, {
      test: /\.css?$/,
      include: path.join(__dirname, 'app'),
      exclude: [nodeModulesPath],
      loader: 'style-loader!css-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
