import alt from '../alt';
import Actions from '../actions/DocumentActions';

class DocumentStore {
  constructor() {
    this.state = {documents: [], errorMessage: null, message: null, doc: [], err: null };
    this.bindListeners({
      handleDocumentsFetch: Actions.documentsSuccessDispatcher,
      handleFetchDocuments: Actions.fetchDocuments,
      handleFetchErrors: Actions.documentsFailedDispatcher,
      handleDeleteResponse: Actions.deleteResponse,
      handleGetDocument: Actions.getDocument,
      handleGetDocumentSuccess: Actions.getDocumentSuccess,
      handleGetDocumentError: Actions.getDocumentError
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

  handleGetDocument(doc) {
    this.setState({doc: []});
  }

  handleGetDocumentSuccess(doc) {
    this.setState({doc: doc});
  }

  handleGetDocumentError(err) {
    this.setState({err: err});
  }
}

export default alt.createStore(DocumentStore, 'DocumentStore');
