import alt from '../alt';
import DocumentSource from '../sources/DocumentSource';
import request from 'superagent';

class Actions {
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
