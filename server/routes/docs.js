(function() {
  'use strict';
  var Document = require('../controllers/docs');
  var Users = require('../controllers/users');

  module.exports = function(app, express) {
    var api = express.Router();

    //api.use(Users.getToken);
    api.get('/publicDocs', Document.getAllPublicDocs);
    api.get('/docs/category', Document.getDocumenstByCategory);
    api.post('/document', Users.getToken, Document.create);
    api.get('/document', Users.getToken, Document.getAllDocuments);
    api.get('/role/document', Users.getToken, Document.getAllDocumentsByRole);
    api.get('/document/date', Users.getToken, Document.getAllDocumentsByDate);
    api.get('/document/category', Users.getToken, Document.getDocumenstByCategory);
    api.get('/document/:_id', Users.getToken, Document.findOne);
    api.put('/document/:_id', Users.getToken, Document.update);
    api.put('/document/contributors/:_id', Users.getToken, Document.addContributors);
    api.delete('/document/:_id', Users.getToken, Document.delete);
    api.get('/users/documents/:userId', Users.getToken, Document.getAllById);

    app.use('/api', api);
  };
})();
