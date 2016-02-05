(function() {
  'use strict';
  var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    config = require('./server/config/config'),
    app = express();

  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer();

  var isProduction = process.env.NODE_ENV === 'production';
  var publicPath = path.resolve(__dirname, 'public');

  // establish connection to mongoose
  mongoose.connect(config.database, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to the database');
    }
  });

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(express.static(publicPath));


  if(!isProduction) {
    var bundle = require('./bundle.js');
    bundle();

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/public/*', function(req, res) {
      proxy.web(req, res, {
        target: 'http://localhost:8080'
      });
    })
  }

  proxy.on('error', function(e) {
      console.log('Could not connect to proxy, please try again....');
  });

  let port = process.env.PORT ||  3000;

  var routes = require('./server/routes');
  // all our routes goes here
  routes(app, express);

  app.listen(port, function(err) {
    if (err) throw err;
    console.log('listening on port:' + port);
  });

  module.exports = app;
})();
