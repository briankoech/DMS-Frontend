import alt from '../alt';
import request from 'superagent';

class Actions {
  getPublicDocs() {
      request
      .get('/api/docs')
      .end(function(err, result) {
        if(err) {
          return;
        }
        console.log(result.body);
        return result.body;
      });
  };
}

export default alt.createActions(Actions);
