(function() {
  'use strict';

  var Roles = require('../controllers/roles');
  var Users = require('../controllers/users');

  module.exports = function(app, express) {
    var api = express.Router();

    api.post('/roles', Users.getToken, Roles.checkUserRole, Roles.create);
    api.get('/roles', Users.getToken, Roles.checkUserRole, Roles.getAllRoles);
    api.put('/roles/:id', Users.getToken, Roles.checkUserRole, Roles.update);
    api.delete('/roles', Users.getToken, Roles.checkUserRole, Roles.delete);

    app.use('/api', api);
  };
})();
