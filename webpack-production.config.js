var WebpackStrip = require('strip-loader');
var devConfig = require('./webpack.config.js');
var stripLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
}
delete devConfig.module.preLoaders;
delete devConfig.plugins;
delete devConfig.devtool;
delete devConfig.entry.main[0];
delete devConfig.entry.main[1];
devConfig.devtool = 'source-map';
devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;
