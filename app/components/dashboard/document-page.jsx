import React from 'react';
import Paper from 'material-ui/lib/paper';
import DocumentActions from '../../actions/documentActions';
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


const style = {
  height: 'auto',
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
    this.onChange = this.onChange.bind(this);
  }

  static getStores(props) {
    return [DocumentStore];
  }

  static getPropsFromStores(props) {
    return {Document: DocumentStore.getState()};
  }

  componentWillMount() {
    // get the document id from
    let token = localStorage.getItem('x-access-token');
    let id = this.props.params.id;
    if (token && id) {
      DocumentActions.getDocument(id, token);
    }
    // else fetch docs without token
  }

  componentDidMount() {
    DocumentStore.listen(this.onChange);
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange(state) {
    console.log(state.documents.data);
    var doc = [];
    doc.push(state.documents.data);
    this.setState({documents: doc});
    console.log('doc', this.state);
  }

  render() {
    if (!this.state.documents.length) {
      console.log('still fetching.......');
      return (
        <h5>Loading....</h5>
      )
    }
    if (this.state.documents) {
      var data = this.state.documents.map((doc, index) => {
        return (
          <div key={index}>
            <Paper style={style} zDepth={3}>
              <div className="row">
                <h3 className="docTitle">{doc.title}</h3>
              </div>
              <Divider/>
              <div className="row">
                <div className="col-md-4" style={{
                  padding: 5,
                  marginLeft: 10
                }}>
                  <h5>
                    By <span style={{color: '#983898'}}><a href={"/author?user="+ doc.ownerId._id}>{doc.ownerId.name.first} {doc.ownerId.name.last}</a> </span> ON &nbsp;
                    {moment(doc.createdAt).format('MMMM Do YYYY')}
                  </h5>
                </div>
                <div className="col-md-3 category" style={{
                  padding: 5
                }}>
                  <h5 style={{color: '#894388'}}><a href={"/category?category="+ doc.category.category}>{doc.category.category}</a></h5>
                </div>
                <div className="actionButtons col-md-4">
                  <IconButton tooltip="Edit" linkButton href={"/edit?document=" + doc._id}>
                    <Edit color={Colors.lightBlue300}/>
                  </IconButton>

                  <IconButton tooltip="Delete">
                    <Delete color={Colors.red500}/>
                  </IconButton>
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
                <FloatingActionButton mini backgroundColor="#55ACEE" href="http://twitter.com/bryomckim" linkButton target="_blank" style={{
                  marginLeft: 0
                }}>
                  <i className="fa fa-twitter fa-1x"></i>
                </FloatingActionButton>
                <FloatingActionButton mini backgroundColor="#3B5998" href={"https://www.facebook.com/sharer/sharer.php?u="+ window.location.href} linkButton target="_blank" style={{
                  marginLeft: 15
                }}>
                  <i className="fa fa-facebook fa-1x"></i>
                </FloatingActionButton>
                <FloatingActionButton mini backgroundColor="#DD4B39" href={"https://plus.google.com/share?url=" + window.location.href} linkButton target="_blank" style={{
                  marginLeft: 15
                }}>
                  <i className="fa fa-google-plus fa-1x"></i>
                </FloatingActionButton>
              </div>
            </Paper>
          </div>
        );
      });

      return (
        <div>{data}{console.log(data)}</div>
      )
    }
  }
}

export default connectToStores(DocumentPage);
