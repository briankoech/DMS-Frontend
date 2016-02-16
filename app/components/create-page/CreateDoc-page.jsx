import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Select from 'react-select';
import FlatButton from 'material-ui/lib/flat-button';
import Snackbar from 'material-ui/lib/snackbar';

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
      open: false
    }
  }

  componentWillMount() {

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

  componentDidMount() {
    DocumentStore.listen(this.onChange);
  }

  onChange = (state) => {
      console.log(state);
      if(!state.errorMessage && state.documents.message) {
        this.handleTouchTap();
      }
  };

  onSubmit = () => {
    // get token
    let token = localStorage.getItem('x-access-token');
    DocumentActions.createDocument(this.state, token);
    DocumentStore.listen(this.onChange);
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
            underlineStyle={{borderColor: '#2196F3'}}
            onChange={this.handleChange}
          />
      </div>
      <div className="row">
          <TextField
            className="col-md-6"
            hintText="Music"
            floatingLabelText="Category"
            name="category"
            underlineStyle={{borderColor: '#2196F3'}}
            onChange={this.handleChange}
          />
        <SelectField underlineStyle={{borderColor: '#2196F3'}} className="col-md-6" value={this.state.accessLevel} name="accessLevel" onChange={this.handleSelectField}>
            <MenuItem value={3} primaryText="Public"/>
            <MenuItem value={2} primaryText="contributors"/>
            <MenuItem value={1} primaryText="Admins"/>
          </SelectField>
        </div>
        <div className="row">
          <TextField
            onChange={this.handleChange}
            className="col-md-11"
            name="content"
            hintText="Message Field"
            floatingLabelText="Content"
            multiLine={true}
            rows={4}
            style={{border: 1}}
            underlineStyle={{borderColor: '#2196F3'}}
          />
        </div>
        <div className="row">
          <FlatButton label="Save" primary={true} onTouchTap={this.onSubmit} />
          <FlatButton label="Cancel" secondary={true} />
        </div>
        <Snackbar
          open={this.state.open}
          message="Document Created successfully"
          action="undo"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default CreateDoc;
