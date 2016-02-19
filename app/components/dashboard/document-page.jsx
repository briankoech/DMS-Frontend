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
                <h3 className="docTitle">ReactJS Tutorial – How to Add or Delete Table Row Dynamically</h3>
              </div>
              <Divider/>
              <div className="row">
                <div className="col-md-4" style={{
                  padding: 5,
                  marginLeft: 10
                }}>
                  <h5>By Brian Koech ON SEPTEMBER 10, 2004</h5>
                </div>
                <div className="col-md-3 category" style={{
                  padding: 5
                }}>
                  <h5>PROGRammING</h5>
                </div>
                <div className="actionButtons col-md-4">
                  <IconButton tooltip="Edit">
                    <Edit color={Colors.lightBlue100}/>
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
                    Render a ReactElement to its initial HTML. This should only be used on the server. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes. If you call ReactDOM.render() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience. Render a ReactElement to its initial HTML. This should only be used on the server. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes. If you call ReactDOM.render() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience. Render a ReactElement to its initial HTML. This should only be used on the server. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes. If you call ReactDOM.render() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience. Render a ReactElement to its initial HTML. This should only be used on the server. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes. If you call ReactDOM.render() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
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
                <FloatingActionButton mini backgroundColor="#3B5998" href="http://facebook.com/brian.kirwa" linkButton target="_blank" style={{
                  marginLeft: 15
                }}>
                  <i className="fa fa-facebook fa-1x"></i>
                </FloatingActionButton>
                <FloatingActionButton mini backgroundColor="#DD4B39" href="https://plus.google.com/+BrianKimutai" linkButton target="_blank" style={{
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
        <div>{data}</div>
      )
    }
  }
}

export default connectToStores(DocumentPage);
