import alt from '../alt';
import Actions from '../actions';

class DocumentStore {
  constructor() {
    // this.state.documents = [];
    // this.state.errorMessage = null;
    this.state = {documents: [], errorMessage: null};
    this.bindListeners({
      handleDocumentsFetch: Actions.updateDocuments,
      handleFetchDocuments: Actions.fetchDocuments,
      handleFetchErrors: Actions.documentsFailed,
    });
  }

  handleDocumentsFetch(docs) {
    console.log(docs);
    this.setState({documents: docs});
  }
  handleFetchDocuments(docs) {
    // while its fetching
    this.documents = [];
    this.setState({documents});
  }

  handleFetchErrors(error) {
    this.setState({errorMessage: error});
  }
}

export default alt.createStore(DocumentStore, 'DocumentStore');
