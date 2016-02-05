import React from 'react';
import Document from './document.jsx';
import Progress from './landing-page/progress.jsx'
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../stores/DocumentStore';
import Actions from '../actions';

// grid start
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};
// @connectToStores(DocumentStore);
class DocumentList extends React.Component {
  constructor() {
    super();
  }

  static getStores(props) {
    return [DocumentStore];
  }

  static getPropsFromStores(props) {
    // called when stores experience change in state
    console.log('change occured', this.props);
    return DocumentStore.getState();
  }

  componentDidMount() {
    Actions.fetchDocuments();
    DocumentStore;
  }

  render() {
    var documentNodes;
    if(!this.props.documents.length) {
      return (
        <Progress />
      );
    }
    if(this.props.documents) {
      documentNodes = this.props.documents.map((document) => {
        return (
          <GridTile key={document._id}>
            <Document document={document} />
          </GridTile>
        );
      });
    } else {
      documentNodes = function()  { return (<div>THis is okey too</div>); };
      console.log('this called', documentNodes);
    }

    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          <div>{documentNodes}</div>
        </GridList>
      </div>
    );
  }
}

export default connectToStores(DocumentList);
