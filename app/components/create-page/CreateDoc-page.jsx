import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Select from 'react-select';
import FlatButton from 'material-ui/lib/flat-button';
import Snackbar from 'material-ui/lib/snackbar';
import Checkbox from 'material-ui/lib/checkbox';

import DocumentActions from '../../actions/documentActions';
import DocumentStore from '../../stores/DocumentStore';

require('../../styles/component.css');

class CreateDoc extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      accessLevel: 3,
      category: '',
      open: false,
      snackbarmsg: '',
    }
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillMount() {
    if(this.props.location.pathname === '/edit') {
      // get the query
      // get the document from db
      // edit data
      // save
      console.log(this.props.location.query.document);
      var id = this.props.location.query.document;
      let token = localStorage.getItem('x-access-token');
      DocumentActions.getDocument(id, token);

    }
  }

  componentDidMount() {
    console.log(this.state.title);
    DocumentStore.listen(this.onChange);
  }

  onChange = (state) => {
    console.log('STATE', state);
      if(!state.errorMessage && state.documents.doc) {
        console.log('saved');
        this.setState({snackbarmsg: 'created successfully'});
        this.handleTouchTap();
      }
      if(!state.errorMessage && state.documents.data) {
        console.log('fetched data');
        this.setState({
          title: state.documents.data.title,
          content: state.documents.data.content,
          category: state.documents.data.category.category,
        });
      }
      if(!state.errorMessage && state.documents.title) {
        console.log('updated');
        this.setState({
          title: '',
          content: '',
          category: ''
        });
        this.setState({snackbarmsg: 'updated successfully'});
        this.handleTouchTap();
      }
      if(state.errorMessage) {
        // error report
      }
  };

  onSubmit = () => {
    // get token
    // get the url
    let token = localStorage.getItem('x-access-token');
    let url = this.props.location.pathname;
    let id = this.props.location.query.document;
    console.log(url);
    if(url === '/create') {
      DocumentActions.createDocument(this.state, token);
      DocumentStore.listen(this.onChange);
    } else if(url === '/edit') {
      DocumentActions.updateDocument(this.state, token, id);
      DocumentStore.listen(this.onChange);
    }
  };

  handleSelectField = (e, index, value) => {
    this.setState({accessLevel: value});
  };

  handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    if(field === 'title') {
      this.setState({title: value});
    } else if(field === 'content') {
      this.setState({content: value});
    } else if(field === 'category') {
      this.setState({category: value});
    }
  };

  render() {
      var getOptions = function(input, callback) {
        setTimeout(function() {
            callback(null, {
                options: [
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                    { value: 'three', label: 'Three' },
                    { value: 'four', label: 'Four' },
                ],
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
                complete: true,
            });
        }, 3000);
    };

    return (
      <div className="container editor">
        <h5>create && edit</h5>
        <div className="row">
          <TextField
            className="col-md-10"
            name="title"
            hintText="Title"
            style={{margin: 5, paddingLeft: 10}}
            floatingLabelText="Document Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
      </div>
      <div className="row">
          <TextField
            className="col-md-6"
            hintText="Music"
            floatingLabelText="Category"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          />
        </div>
        <div className="row">
          <div className="col-md-4">
          <Checkbox
            label="Public"
            defaultChecked={true}
          />
          </div>
          <div className="col-md-4">
          <Checkbox
            label="Contributors"
          />
          </div>
          <div className="col-md-4">
          <Checkbox
            label="Admins"
          />
          </div>
        </div>
        <div className="row">
          <TextField
            onChange={this.handleChange}
            className="col-md-11"
            name="content"
            hintText="Document content"
            floatingLabelText="Document Content"
            multiLine={true}
            value={this.state.content}
            rows={4}
            style={{border: 0}}
          />
        </div>
        <div className="row">
          <FlatButton label="Save" style={{margin: '0 auto'}} primary={true} onTouchTap={this.onSubmit} />
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.snackbarmsg}
          action="undo"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default CreateDoc;
