import alt from '../alt';
import Actions from '../actions';

class DocumentStore {
  constructor() {
    this.state = {documents: []};

    this.bindListeners({
      getPublicDocuments: Actions.getPublicDocs,
    })
  }

  getPublicDocuments(docs) {
    this.setState({documents: docs});
  }
}

export default alt.createStore(DocumentStore, 'DocumentStore');
