import React from 'react';
import Paper from 'material-ui/lib/paper';
import DocumentActions from '../../actions/DocumentActions';
import DocumentStore from '../../stores/DocumentStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import Divider from 'material-ui/lib/divider';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Colors from 'material-ui/lib/styles/colors';
import moment from 'moment';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/lib/snackbar';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';

const style = {
  height: 'auto',
  width: '100%',
  margin: 0,
  textAlign: 'center',
  display: 'inline-block'
};

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      open: false,
      snackopen: false,
      isLoggedIn: false,
      docId: null,
      userId: null,
      role: null,
      openPop: false
    };
  }

  componentWillMount() {
    // get the document id from
    //  get user session
    let token = localStorage.getItem('x-access-token');
    let id = this.props.params.id;
    if(token) {
      SessionActions.getSession(token);
    } else {
      DocumentActions.getDocument(id);
    }
  }

  componentDidMount() {
    SessionStore.listen(this.onSession);
    DocumentStore.listen(this.onChange);
  }
  onSession = (state) => {
    let id = this.props.params.id;
    if(!state.error && state.user) {
      this.setState({isLoggedIn: true, userId: state.user._id, role: state.user.role.title});
      let token = localStorage.getItem('x-access-token');
      DocumentActions.getDocument(id, token);
    } else {
      this.setState({isLoggedIn: false});
      DocumentActions.getDocument(id);
    }
  };
  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange = (state) => {
    if(state && state.message === 'delete successfuly') {
      browserHistory.push('/');
    } else {
      let doc = [];
      this.setState({docId: state.doc.data._id});
      doc.push(state.doc.data);
      this.setState({documents: doc});
    }
  };

  handleDelete = () => {
    let token = localStorage.getItem('x-access-token');
    let id = this.state.docId;
    DocumentActions.deleteDocument(id, token);
    this.setState({snackopen: true});
    this.handleClose();
  };

  handleRequestClose = () => {
    this.setState({snackopen: false});
  };
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    this.setState({
      openPop: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      openPop: false
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDelete}
      />
    ];

    if (!this.state.documents.length) {
      return (
        <h5>Loading....</h5>
      )
    }
    if (this.state.documents) {
      var data = this.state.documents.map((doc, index) => {
        return (
          <div key={index} className="docPage">
            <Paper zDepth={3}>
              <div className="row docTitle">
                <h3 className="title">{doc.title}</h3>
              </div>
              <Divider/>
              <div className="row subTitle">
                <div className="col-xs-6
                      col-sm-6
                      col-md-6
                      col-lg-6"
                      >
                  <h5>
                    By <span className="docAuthor"><a href={"/author?user="+ doc.ownerId._id}>{doc.ownerId.name.first} {doc.ownerId.name.last}</a> </span> ON &nbsp;
                    {moment(doc.createdAt).format('MMMM Do YYYY')}
                  </h5>
                </div>
                <div className="col-xs-2
                col-sm-2
                col-md-2
                col-lg-2 category">
                  <h5><a href={"/category?category="+ doc.category.category}>{doc.category.category}</a></h5>
                </div>
              </div>
              <Divider/>
              <div className="row">
                <div className="doc-content">
                  <p className="">
                    {doc.content}
                  </p>
                </div>
              </div>
              <div className="shareMsg">
                Share this:
              </div>
              <div className="col-md-12 socialButtons">
                <FloatingActionButton style={{margin: 5}} mini backgroundColor="#3B5998" href={"https://www.facebook.com/sharer/sharer.php?u="+ window.location.href} linkButton target="_blank">
                  <i className="fa fa-facebook fa-1x"></i>
                </FloatingActionButton>
                <FloatingActionButton style={{margin: 5}} mini backgroundColor="#DD4B39" href={"https://plus.google.com/share?url=" + window.location.href} linkButton target="_blank">
                  <i className="fa fa-google-plus fa-1x"></i>
                </FloatingActionButton>
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
            </Paper>

            <Popover
              style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
              className="popover"
              open={this.state.openPop}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationFromTop}
            >
              <div className="popover-button">
                <ul className="popover-list">
                  <li>
                    {
                      this.state.userId === doc.ownerId._id || this.state.role === 'admin' || doc.contributors.indexOf(this.state.userId) > -1 ?
                      <IconButton tooltip="Delete" onTouchTap={this.handleOpen}>
                        <Delete color={Colors.red500}/>
                      </IconButton>
                  : null
                  }
                </li>
                <li>
                  {
                    this.state.userId === doc.ownerId._id || this.state.role === 'admin' ?
                      <IconButton tooltip="Edit" linkButton href={"/edit?document=" + doc._id}>
                        <Edit color={Colors.lightBlue300}/>
                      </IconButton>
                  : null
                }
                </li>
                </ul>
              </div>
            </Popover>
          </div>
        );
      });

      return (
        <div>
          {data}
          <Snackbar
            open={this.state.snackopen}
            message="Deleted successfuly"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        {
          this.state.isLoggedIn ?
          <FloatingActionButton  onTouchTap={this.handleTouchTap} style={{position: 'fixed',
            bottom: '5em',
            left: '90%'}} >
            <Edit />
          </FloatingActionButton>
          : null
        }

        </div>
      )
    }
  }
}

export default DocumentPage;
