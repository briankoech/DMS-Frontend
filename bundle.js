var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var WebpackConfig = require('./webpack.config.js');
var path = require('path');
var fs = require('fs');
var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');

module.exports = function() {

  // fire up webpack and pass in config we created
  var bundleStart = null;
  var compiler = Webpack(WebpackConfig);

// give notice to terminal when it starts bundling and
// set the timer it started
  compiler.plugin('compile', function() {
    console.log('Bundling....');
    bundleStart = Date.now();
  });

 // notice when it is done compiling
 compiler.plugin('done', function() {
   console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms');
 });

 var bundler = new WebpackDevServer(compiler, {
    publicPath: '/public/',

    // configure hot replacement
    hot: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
 });

 // We fire up the development server and give notice in the terminal
 // that we are starting the initial bundle

 bundler.listen(8080, 'localhost', function() {
   console.log('Bundling project, please wait....');
 });
}
