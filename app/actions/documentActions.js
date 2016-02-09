import alt from '../alt';
// import BaseActions from './BaseActions.js';
import request from 'superagent';

class Actions {
  constructor() {
  }

  updateDocuments(documents) {
    console.log('triggred');
    return documents;
  }

  fetchDocuments() {
    request
      .get('/api/docs')
      .end((err, res) => {
        if(err) {
          this.documentsFailed({error: err});
        } else {
          setTimeout(() => {
            this.updateDocuments(res.body);
          }, 3000);
        }
      });
  }

  documentsFailed(errorMessage) {
    return errorMessage;
  }

}

export default alt.createActions(Actions);
