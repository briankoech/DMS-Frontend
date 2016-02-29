import alt from '../alt';
import Actions from '../actions/documentActions';

class DocumentStore {
  constructor() {
    this.state = {documents: [], errorMessage: null, message: null };
    this.bindListeners({
      handleDocumentsFetch: Actions.updateDocuments,
      handleFetchDocuments: Actions.fetchDocuments,
      handleFetchErrors: Actions.documentsFailed,
      handleDeleteResponse: Actions.deleteResponse
    });
  }

  handleDocumentsFetch(docs) {
    this.setState({documents: docs});
  }
  handleFetchDocuments(docs) {
    // while its fetching
    //this.documents = [];
    this.setState({documents: []});
  }

  handleFetchErrors(error) {
    this.setState({errorMessage: error});
  }

  handleDeleteResponse(msg) {
    console.log(msg);
    this.setState({message: msg});
  }
}

export default alt.createStore(DocumentStore, 'DocumentStore');
