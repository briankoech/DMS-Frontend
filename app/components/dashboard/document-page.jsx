import React from 'react';
import Paper from 'material-ui/lib/paper';
import DocumentActions from '../../actions/documentActions';
import DocumentStore from '../../stores/DocumentStore';
import connectToStores from 'alt-utils/lib/connectToStores';

const style = {
  height: 'auto',
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',

};

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {documents: []};
    this.onChange = this.onChange.bind(this);
  }

  static getStores(props) {
    return [DocumentStore];
  }

  static getPropsFromStores(props) {
    return {
      Document: DocumentStore.getState(),
    };
  }

  componentWillMount() {
    // get the document id from
    let token = localStorage.getItem('x-access-token');
    let id = this.props.params.id;
    if(token && id) {
      DocumentActions.getDocument(id, token);
    }
    // else fetch docs without token
  }

  componentDidMount() {
    DocumentStore.listen(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange(state) {
    console.log(state);
    var doc = [];
    doc.push(state.documents);
    this.setState({documents: doc});
    console.log(doc);
  }

  render() {
    if(!this.state.documents.length) {
      console.log('still fetching.......');
      return (
        <h5>Loading....</h5>
      )
    }
    if(this.state.documents) {
      console.log(this.state.documents);
      console.log('READY ');
      var data = this.state.documents.map((doc, index) => {
        return (
          <div key={index}>
            <Paper style={style} zDepth={3}>
              <div className="row">
                <h3 className="docTitle">{doc.title}</h3>
              </div>
              <div className="row">
                <p className="content">
                  Content
                  {doc.content}
                </p>
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
