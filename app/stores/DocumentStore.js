import alt from '../alt';
import Actions from '../actions/DocumentActions';

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
    if(docs.length === 0) {
      this.setState({documents: 'No documens found'});
    } else {
      this.setState({documents: docs});
    }
  }
  handleFetchDocuments(docs) {
    // while its fetching
    this.setState({documents: []});
  }

  handleFetchErrors(error) {
    this.setState({errorMessage: error});
  }

  handleDeleteResponse(msg) {
    this.setState({message: msg});
  }
}

export default alt.createStore(DocumentStore, 'DocumentStore');
