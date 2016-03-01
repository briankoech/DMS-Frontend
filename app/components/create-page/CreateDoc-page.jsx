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
import CategoryActions from '../../actions/categoryActions';
import CategoryStore from '../../stores/categoryStore';
import { browserHistory } from 'react-router';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

const FMUI = require('formsy-material-ui');
const {FormsyText, FormsySelect, FormsyRadioGroup, FormsyRadio} = FMUI;

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
      canSubmit: false,
      categories: []
    }
  }

  handleTouchTap = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  componentWillMount() {
    let token = localStorage.getItem('x-access-token');
    SessionActions.getSession(token);
    SessionStore.listen(this.onSession);
  }
  onSession = (state) => {
    if(state && state.error) {
      browserHistory.push(`/`);
    }
  };
  componentDidMount() {
    CategoryActions.fetchCategory();
    if (this.props.location.pathname === '/edit') {
      var id = this.props.location.query.document;
      let token = localStorage.getItem('x-access-token');
      DocumentActions.getDocument(id, token);
    }

    CategoryStore.listen(this.onCategoryChange);
    DocumentStore.listen(this.onChange);
  }

  onCategoryChange = (state) => {
    console.log(state.categories);
    this.setState({categories: state.categories});
  };

  onChange = (state) => {
    if (!state.errorMessage && state.documents.doc) {
      this.setState({snackbarmsg: 'created successfully'});
      this.handleTouchTap();
      browserHistory.push(`/document/${state.documents.doc._id}`);
    }
    if (!state.errorMessage && state.documents.data) {
      this.setState({title: state.documents.data.title, content: state.documents.data.content, accessLevel: state.documents.data.accessLevel, category: state.documents.data.category.category});
    }
    if (!state.errorMessage && state.documents.title) {
      console.log('updated');
      this.setState({title: '', content: '', category: ''});
      this.setState({snackbarmsg: 'updated successfully'});
      this.handleTouchTap();
      browserHistory.push(`/document/${state.documents._id}`);
    }
    if (state.errorMessage) {
      // error report
      this.setState({snackbarmsg: 'Error occured!!'});
      this.handleTouchTap();
    }
  };

  onSubmit = (model) => {
    console.log(model);
    //resetForm();
    // get token
    // get the url
    let token = localStorage.getItem('x-access-token');
    let url = this.props.location.pathname;
    if (url === '/create') {
      DocumentActions.createDocument(model, token);
      DocumentStore.listen(this.onChange);
    } else if (url === '/edit') {
      let id = this.props.location.query.document;
      DocumentActions.updateDocument(model, token, id);
      DocumentStore.listen(this.onChange);
    }
  };

  handleSelectField = (e, index, value) => {
    this.setState({accessLevel: value});
  };


  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };
  render() {
    let categoryNodes = this.state.categories.map((category, index) => {
      return (<MenuItem key={index} value={category.category} primaryText={category.category}/>);
    });

    return (
      <div className="container editor">
        <h5>create && edit</h5>
        <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.onSubmit}>

          <FormsyText className="" name='title' validationError="This field is required" value={this.state.title} required fullWidth hintText="Title" floatingLabelText="Title" style={{
            margin: 5,
            paddingLeft: 10
          }}/>
        <FormsySelect name='category' fullWidth required floatingLabelText="Document Category">
            {categoryNodes}
            <MenuItem value={this.state.category} primaryText={this.state.category}/>
        </FormsySelect>
          <FormsyRadioGroup className="row" name="accessLevel" fullWidth defaultSelected="3">
            <FormsyRadio className="col-md-4" value="3" label="Public"/>
            <FormsyRadio className="col-md-4" value="2" label="Contributors"/>
            <FormsyRadio className="col-md-4" value="1" label="Admins"/>
          </FormsyRadioGroup>
          <FormsyText className="" name='content' value={this.state.content} validations="minLength:10" validationError="Miminum of 10 chars required" required fullWidth hintText="Content" multiLine={true} rows={4} floatingLabelText="Document Content" style={{
            margin: 5,
            paddingLeft: 10
          }}/>
          <div className="row">
            <FlatButton label="Save" style={{
              margin: '0 auto'
            }} primary={true} type="submit" disabled={!this.state.canSubmit} />
          </div>
        </Formsy.Form>
        <Snackbar open={this.state.open} message={this.state.snackbarmsg} action="undo" autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
      </div>
    )
  }
}

export default CreateDoc;
