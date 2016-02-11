(function() {
  'use strict';
  var Users = require('../controllers/users');

  module.exports = function(app, express) {
    var api = express.Router();

    api.post('/users', Users.create); // close sign-up

    api.post('/users/login', Users.login); // close sign in
    api.get('/users/session', Users.getToken, Users.session);
    api.get('/users/token', Users.getToken, Users.getToken);
    api.get('/users/:userId', Users.getToken, Users.find); // Find a user before RUD
    api.get('/users', Users.getToken, Users.getAllUsers);
    api.put('/users/:userId', Users.getToken, Users.update);
    api.delete('/users/:userId', Users.getToken, Users.delete);
    api.post('/users/logout', Users.getToken, Users.logout);

    app.use('/api', api);
  };

})();
