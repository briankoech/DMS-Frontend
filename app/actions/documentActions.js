import alt from '../alt';
// import BaseActions from './BaseActions.js';
import request from 'superagent';

class Actions {
  constructor() {
  }

  updateDocuments(documents) {
    return documents;
  }

  fetchDocuments(id, token) {
    let url;
    if(token) {
      url = '/api/role/document';
    } else {
      url = '/api/publicDocs';
    }
    request
      .get(url)
      .set('x-access-token', token)
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

  getOneDocument(id, token) {
      let url;
      if(token) {
        url = '/api/document/' + id;
      } else {
        url = '/api/publicDocs';
      }
      request
        .get(url)
        .set('x-access-token', token)
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
