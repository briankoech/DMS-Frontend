import React from 'react';
import Document from './document.jsx';
import Actions from '../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../stores/DocumentStore';

class DocumentList extends React.Component {

  static getStores() {
    return [DocumentStore]
  }

  static getPropsFromStores() {
    // called when stores experience change in state
    return DocumentStore.getState();
  }

  componentWillMount() {
    Actions.getPublicDocs();
  }

  render() {
    console.log(this.props.documents);
    var documentNodes = this.state.documents.map((document) => {
      return (
        <div key={document.id}><Document document={document} /></div>
      );
    });

    return (
        <div>{documentNodes}</div>
    );
  }
}

export default connectToStores(DocumentList);
