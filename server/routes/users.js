(function() {
  'use strict';
  var Users = require('../controllers/users');
  var Documents = require('../controllers/docs');
  var Categories = require('../controllers/category.js');

  module.exports = function(app, express) {
    var api = express.Router();

    api.post('/users', Users.create); // close sign-up

    api.post('/users/login', Users.login); // close sign in

    api.get('/docs', Documents.getAllPublicDocs);
    api.get('/categories', Categories.getAllCategories);

    api.use(Users.getToken); // Middleware to allow one to continue

    api.get('/users/token', Users.getToken);

    api.get('/users/:userId', Users.find); // Find a user before RUD

    api.get('/users', Users.getAllUsers);

    api.put('/users/:userId', Users.update);
    api.delete('/users/:userId', Users.delete);
    api.post('/users/logout', Users.logout);

    app.use('/api', api);
  };

})();
