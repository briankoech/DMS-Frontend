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
    this.state = {user: '', documents: [], role: ''};

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
    var token = localStorage.getItem('x-access-token');
    var user = localStorage.getItem('user');
    console.log(this.props.location);
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
      // check if user is logged in or not
      // register an action
      // get the docs based on userId
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
  }

  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  userLoggedIn(state) {
    if(state.message) {
      this.setState({user: state.message.user});
    }
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
      documentNodes = this.props.Document.documents.map((document) => {
        return (
          <div key={document._id} className="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4">
            <Document user={this.state.user} document={document} className="box" />
          </div>
        );
      });
    } else {
      documentNodes = function()  { return (<div>THis is okey too</div>); };
    }

    return (
        <div className="row">{documentNodes}</div>
    );
  }
}

export default connectToStores(DocumentList);
