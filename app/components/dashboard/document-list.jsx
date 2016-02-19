import React from 'react';
import Document from './document.jsx';
import Progress from './progress.jsx'
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../../stores/DocumentStore';
import Actions from '../../actions/documentActions';
import LoginStore from '../../stores/LoginStore';

// grid start
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import ReactDOM from 'react-dom';

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
  constructor(props) {
    super(props);
    this.state = {user: '', documents: [], role: '', open: false, deleted: null};

    this.onChange = this.onChange.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }

  static getStores(props) {
    return [DocumentStore, LoginStore];
  }

  static getPropsFromStores(props) {
    return {
      Document: DocumentStore.getState(),
      Login: LoginStore.getState(),
    };
  }

  componentWillMount() {
    console.log('Mounting again');
    var token = localStorage.getItem('x-access-token');
    var user = localStorage.getItem('user');
    if(this.props.location.pathname === '/') {
      if(user && token) {
        Actions.fetchDocuments(user.id, token);
      } else {
        Actions.fetchDocuments();
      }
    } else if(this.props.location.pathname === '/category') {
      var type = this.props.location.query.category;
      Actions.fetchByCategory(type, token);
    } else if(this.props.location.pathname === '/author') {
      let userId = this.props.location.query.user;
      if(user && token) {
        Actions.fetchDocumentsByUser(userId, token);
      } else {
        Actions.fetchDocumentsByUser(userId);
      }
    }
  }

  componentDidMount() {
    DocumentStore.listen(this.onChange);
    LoginStore.listen(this.userLoggedIn);
    console.log(React.Children);
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('re-rendered');
    return true;
  }
  userLoggedIn(state) {
    if(state.message) {
      this.setState({user: state.message.user});
    }
  }

  onChange(state) {
    console.log('deleted object',this.state.deleted);
    // filter the data
    let docs = state.documents.filter((val) => {
      console.log(val._id, this.state.deleted);
      return val._id !== this.state.deleted;
    });
    console.log('docs', state.documents);

    this.setState({documents: docs});
    if(state.message) {
      console.log('delete happened', state);
      this.handleClose();

    }
  }
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = (id) => {
    console.log(this.refs.item.state.docId);
    let token = localStorage.getItem('x-access-token');
    //let id = this.refs.item.state.docId;
    this.setState({deleted: id});
    console.log('id to delete', id);
    // Actions.deleteDocument(id, token);
    //this.refs.item.handleDelete();
  };


  kevin = () => {
    this.refs.item.handleDelete();
  };

  render() {
    var documentNodes;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.kevin}
      />,
    ];
    if(!this.state.documents.length) {
      return (
        <Progress />
      );
    }
    if(this.state.documents) {
      documentNodes = this.state.documents.map((document) => {
        return (
          <div key={document._id} className="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4">
            <Document user={this.state.user} handleDelete={this.handleDelete} document={document} ref={'item'} open={this.handleOpen} className="box" />
          </div>
        );
      });
    } else {
      documentNodes = function()  { return (<div>THis is okey too</div>); };
    }

    return (
      <div>
        <div className="row">
          {documentNodes}
        </div>
        <Dialog
          title="Are you sure?"
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '20%'}}
          actions={actions}
        >
          These operation will delete the article permanently
        </Dialog>
      </div>
    );
  }
}

export default connectToStores(DocumentList);
