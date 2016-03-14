import alt from '../alt';
import request from 'superagent';

class Actions {
  constructor() {
  }

  documentsSuccessDispatcher(documents) {
    return documents;
  }

  fetchDocuments(id, token) {
    //return super.get(url, token);
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
          this.documentsFailedDispatcher({error: err});
        } else {
          this.documentsSuccessDispatcher(res.body);
        }
      });
  }

  fetchDocumentsByUser(id, token) {
    //return super.get(url, token);
    let url;
    if(token) {
      url = '/api/users/documents/' + id;
    } else {
      url = '/api/publicDocsByUser/' + id;
    }
    request
      .get(url)
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          this.documentsFailedDispatcher({error: err});
        } else {
          this.documentsSuccessDispatcher(res.body);
        }
      });
  }
  getDocument(id, token) {
    let url = '/api/document/' + id;
    request
      .get(url)
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          this.getDocumentError({error: err});
        } else {
          this.getDocumentSuccess(res.body);
        }
      });
  }

  getDocumentSuccess(docs) {
    return docs;
  }

  getDocumentError(err) {
    return err;
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
          this.documentsFailedDispatcher({error: err});
        } else {
          this.documentsSuccessDispatcher(res.body);
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
        console.log(err, result.body);
        if(err) {
          this.documentsFailedDispatcher({error: err})
        } else if(result.body.error) {
          this.documentsFailedDispatcher(result.body);
        } else {
          this.documentsSuccessDispatcher(result.body);
        }
      });
  }
  updateDocument(data, token, id) {
    let url = '/api/document/'+ id;
    request
      .put(url)
      .send(data)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.documentsFailedDispatcher({error: err})
        } else if(result.body.error) {
          this.documentsFailedDispatcher(result.body);
        } else {
          this.documentsSuccessDispatcher(result.body);
        }
      });
  }
  deleteDocument(id, token) {
    request
      .delete('/api/document/'+ id)
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          this.deleteResponse({error: err});
        } else {
          this.deleteResponse(res.body.message);
        }
      });
  }
  deleteResponse(message) {
    return message;
  }
  documentsFailedDispatcher(errorMessage) {
    return errorMessage;
  }
}

export default alt.createActions(Actions);
