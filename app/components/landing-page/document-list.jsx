import React from 'react';
import Document from './document.jsx';
import Progress from './progress.jsx'
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../../stores/DocumentStore';
import Actions from '../../actions/documentActions';

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
    width: '100%',
    height: 900,
    overflowY: 'auto',
    marginBottom: 24,
  },
};
// @connectToStores(DocumentStore);
class DocumentList extends React.Component {
  constructor() {
    super();
    this.state = {user: '', documents: []};

    this.onChange = this.onChange.bind(this);
  }

  static getStores(props) {
    return [DocumentStore];
  }

  static getPropsFromStores(props) {
    return DocumentStore.getState();
  }

  componentDidMount() {
    Actions.fetchDocuments();
    DocumentStore.listen(this.onChange);
  }

  onChange(state) {
    this.setState({documents: state.documents})
  }

  render() {
    var documentNodes;
    if(!this.state.documents.length) {
      return (
        <Progress />
      );
    }
    if(this.state.documents) {
      documentNodes = this.props.documents.map((document) => {
        return (
          <div key={document._id} className="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4">
            <Document document={document} className="box" />
          </div>
        );
      });
    } else {
      documentNodes = function()  { return (<div>THis is okey too</div>); };
    }

    return (
      <div>
          <div className="row titleHead">
            <h1 className="col-md-12 dmshead">Document Management System</h1><br />
            <p>Create, edit, save documents for free</p>
          </div>
          <div className="row">{documentNodes}</div>
      </div>
    );
  }
}

export default connectToStores(DocumentList);
