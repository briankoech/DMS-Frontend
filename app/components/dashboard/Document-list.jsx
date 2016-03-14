import React from 'react';
import Document from './Document.jsx';
import Progress from './Progress.jsx'
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentStore from '../../stores/DocumentStore';
import Actions from '../../actions/DocumentActions';
import LoginStore from '../../stores/LoginStore';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

// grid start
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import ReactDOM from 'react-dom';
import { Link } from 'react-router';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};
// @connectToStores(DocumentStore);
class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: '', documents: [], role: '', open: false, deleted: null, isLoggedIn: false};
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
      localStorage.removeItem('x-access-token');
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
    if(!this.state.documents) {
      return (
        <Progress />
      );
    } else if(this.state.documents === 'No documens found') {
      return (
        <div>
          <h3>No Documents found</h3>
            {
              this.state.isLoggedIn ?
              <Link to="/create">
              <FloatingActionButton  linkButton style={{position: 'fixed',
                bottom: '5em',
                left: '90%'}} >
                  <ContentAdd />
              </FloatingActionButton>
              </Link>
              : null
            }
        </div>
      );
    } else if(this.state.documents) {
      documentNodes = this.state.documents.map((document) => {
        return (
          <div key={document._id} className="col-xs-12
                col-sm-6
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
        {
          this.state.isLoggedIn ?
          <Link to="/create">
          <FloatingActionButton  linkButton style={{position: 'fixed',
            bottom: '5em',
            left: '90%'}} >
              <ContentAdd />
          </FloatingActionButton>
          </Link>
          : null
        }

      </div>
    );
  }
}

export default DocumentList;
