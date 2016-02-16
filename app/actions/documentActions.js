import alt from '../alt';
//import BaseActions from './BaseActions.js';
import request from 'superagent';

class Actions {
  constructor() {
  }

  updateDocuments(documents) {
    return documents;
  }

  fetchDocuments(id, token) {
    //return super.get(url, token);
    console.log('called againf');
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

  getDocument(id, token) {
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

  fetchByCategory(type, token) {
    let url;
    if(token) {
      url = '/api/document/category?category='+ type;
    } else {
      url = '/api/docs/category?category='+ type;
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

  createDocument(data, token) {
    let url = '/api/document';
    request
      .post(url)
      .send(data)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.documentsFailed({error: err})
        } else if(result.body.error) {
          this.documentsFailed(result.body);
        } else {
          this.updateDocuments(result.body);
        }
      });
  }

  documentsFailed(errorMessage) {
    return errorMessage;
  }

}

export default alt.createActions(Actions);
