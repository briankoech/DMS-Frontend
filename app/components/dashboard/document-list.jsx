import React from 'react';
import Document from './document.jsx';
import Progress from './progress.jsx'
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../../stores/DocumentStore';
import Actions from '../../actions/documentActions';
import LoginStore from '../../stores/LoginStore';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

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
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    height: 900,
    overflowY: 'auto',
    marginBottom: 24
  }
};
// @connectToStores(DocumentStore);
class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: '', documents: [], role: '', open: false, deleted: null, isLoggedIn: false};
  }

  static getStores(props) {
    return [DocumentStore, SessionStore];
  }

  static getPropsFromStores(props) {
    return {
      Document: DocumentStore.getState(),
      Session: SessionStore.getState()
    };
  }

  componentWillMount() {
    var token = localStorage.getItem('x-access-token');
    if(token) {
      SessionActions.getSession(token);
    } else {
      if(this.props.location.pathname === '/') {
          Actions.fetchDocuments();
      } else if(this.props.location.pathname === '/category') {
        let type = this.props.location.query.category;
        Actions.fetchByCategory(type, token);
      } else if(this.props.location.pathname === '/author') {
        let userId = this.props.location.query.user;
        Actions.fetchDocumentsByUser(userId);
      }
    }
  }

  componentDidMount() {
    DocumentStore.listen(this.onChange);
    SessionStore.listen(this.onSession);
  }

  componentWillReceiveProps(nextProps) {
  }

  onSession = (state) => {
    if(!state.error && state.user) {
      let token = localStorage.getItem('x-access-token');
      this.setState({isLoggedIn: true, user: state.user});
      if(this.props.location.pathname === '/') {
        Actions.fetchDocuments(state.user._id, token);
      } else if(this.props.location.pathname === '/category') {
        let type = this.props.location.query.category;
        Actions.fetchByCategory(type, token);
      } else if(this.props.location.pathname === '/author') {
        let userId = this.props.location.query.user;
        Actions.fetchDocumentsByUser(userId, token);
      }
    } else {
      this.setState({isLoggedIn: false});
      Actions.fetchDocuments();
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange = (state) => {
    this.setState({documents: state.documents});
  };

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    var documentNodes;
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
      <div className="row">
        {documentNodes}
      </div>
    );
  }
}

export default connectToStores(DocumentList);
