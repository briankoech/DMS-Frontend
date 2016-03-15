import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Select from 'react-select';
import FlatButton from 'material-ui/lib/flat-button';
import Snackbar from 'material-ui/lib/snackbar';
import Checkbox from 'material-ui/lib/checkbox';

import DocumentActions from '../../actions/DocumentActions';
import DocumentStore from '../../stores/DocumentStore';
import CategoryActions from '../../actions/CategoryActions';
import CategoryStore from '../../stores/CategoryStore';
import { browserHistory } from 'react-router';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

import { FormsyText, FormsySelect, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui';

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
    this.setState({categories: state.categories});
  };

  onChange = (state) => {
    if (!state.errorMessage && state.documents.doc) {
      this.setState({snackbarmsg: 'created successfully'});
      this.handleTouchTap();
      browserHistory.push(`/document/${state.documents.doc._id}`);
    }
    if (!state.errorMessage && state.doc.data) {
      this.setState({title: state.doc.data.title, content: state.doc.data.content, accessLevel: state.doc.data.accessLevel, category: state.doc.data.category.category});
    }
    if (!state.errorMessage && state.documents.title) {
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
        <h5 className="create-header">create && edit</h5>
        <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.onSubmit}>

          <FormsyText className="row" name='title' validationError="This field is required" value={this.state.title} required fullWidth hintText="Title" floatingLabelText="Title" style={{
            margin: 5,
            paddingLeft: 10
          }}/>
        <div className="row">
          <div className="col-xs-12
              col-sm-12 col-md-6 col-lg-6 category-list">
        <FormsySelect name='category' fullWidth required floatingLabelText="Document Category">
            {categoryNodes}
            <MenuItem value={this.state.category} primaryText={this.state.category}/>
        </FormsySelect>
      </div>

      </div>
          <div className="col-xs-12
              col-sm-12 col-md-6 col-lg-6 access-level">
              <h3>Access Level</h3>
            <FormsyRadioGroup labelPosition="right" className="row radios" name="accessLevel" fullWidth defaultSelected="3">
              <FormsyRadio className="col-xs-12
                  col-sm-12
                  col-md-4
                  col-lg-4 radio" value="3" label="Public"/>
                <FormsyRadio className="col-xs-12
                  col-sm-12
                  col-md-4
                  col-lg-4 radio" value="2" label="Contributors"/>
                <FormsyRadio className="col-xs-12
                  col-sm-12
                  col-md-4
                  col-lg-4 radio" value="1" label="Admins"/>
            </FormsyRadioGroup>
          </div>
          <FormsyText className="" style={{textAlign: 'left'}} floatingLabelStyle={{float: 'left', color: '#886622', textAlign: 'left'}} name='content' value={this.state.content} validations="minLength:10" validationError="Miminum of 10 chars required" required fullWidth hintText="Content" multiLine={true} rows={4} floatingLabelText="Document Content" style={{
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
