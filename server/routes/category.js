(function() {
  'use strict';

  var Category = require('../controllers/category');
  var Roles = require('../controllers/roles');
  var Users = require('../controllers/users');

  module.exports = function(app, express) {
    var api = express.Router();

    api.post('/category', Users.getToken, Category.create);
    api.get('/category', Users.getToken, Category.getAllCategories);
    api.put('/category/:id', Users.getToken, Roles.checkUserRole, Category.update);
    api.delete('/category/:id', Users.getToken, Roles.checkUserRole, Category.delete);
    app.use('/api', api);
  };
})();
