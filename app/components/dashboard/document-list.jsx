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
    return DocumentStore.getState();
  }

  componentDidMount() {
    console.log(this.props);
    Actions.fetchDocuments();
    DocumentStore.listen(this.onChange);
    LoginStore.listen(this.userLoggedIn);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    //this.setState({role: this.props.state})
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  userLoggedIn(state) {
    // get the user role
    // update the data on the dashboard
    if(state.message) {
      console.log('someone just logged in', state.message.user);
      this.setState({user: state.message.user});
      console.log(this.state.user.role.title);
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
      documentNodes = this.props.documents.map((document) => {
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
