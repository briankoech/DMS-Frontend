import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import SignupAction from '../../actions/signupActions.js';
import SignupStore from '../../stores/SignupStore';
import SessionActions from '../../actions/SessionActions';
import UserProfileActions from '../../actions/UserProfileActions';
import UserProfileStores from '../../stores/UserProfileStore';
import SessionStore from '../../stores/SessionStore';
import connectToStores from 'alt-utils/lib/connectToStores';

const FMUI = require('formsy-material-ui');
const {FormsyText} = FMUI;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      model: null,
      success: false,
      firstname: '',
      lastname: '',
      email: '',
      userId: null
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('x-access-token');
    SessionStore.listen(this.onChange);
    UserProfileStores.listen(this.onUpdate);
  }

  onChange = (state) => {
    if (state && state.user) {
      this.setState({
        userId: state.user._id,
        firstname: state.user.name.first,
        lastname: state.user.name.last,
        email: state.user.email
      });
    }
  };

  onUpdate = (state) => {
    if(!state.error && state.user) {
      this.props.snackbar('update was successful');
      this.props.onClick();
    } else {
      this.props.snackbar('Error occured');
      this.props.onClick();
    }
  };

  handleUpdateUser = (model) => {
    this.setState({model: model});
    let token = localStorage.getItem('x-access-token');
    UserProfileActions.updateUser(this.state.userId, model, token);
    //resetForm();
  };
  componentWillUnmount() {
    this.setState({success: false});
  }
  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };

  render() {
    return (
      <Dialog actionsContainerClassName="" bodyClassName="" modal={false} open={this.props.openprofile} onRequestClose={this.props.onClick} autoScrollBodyContent contentStyle={{width: '30%'}}>
        <div className="signup">
          <h3 className="">My Profile</h3>
          <hr/>
          <div className="row">
            <p style={
                this.state.success ?
                   {
                     display: 'block',
                     color: '#0ACA36',
                     'text-align': 'center',
                     'font-size': '1.2em',
                     'font-family': 'monospace'
                    }
                 : {display: 'none'}
              }
              >Signup success. Proceed to login.</p>
          </div>
          <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleUpdateUser}>
            <FormsyText className="" name='email' value={this.state.email} validations='isEmail' fullWidth validationError="Please enter a valid email" required hintText="johndoe@example.com" floatingLabelText="email"/>
            <FormsyText className="" name='firstname' value={this.state.firstname} fullWidth validations='isWords' validationError="Please use letters only" required hintText="John" floatingLabelText="Firstname"/>
            <FormsyText className="" name='lastname' value={this.state.lastname} validations='isWords' fullWidth validationError="Please use letters only" required hintText="Doe" floatingLabelText="Lastname"/>
              <FormsyText className="" name='password' fullWidth validations="minLength:6" validationError="Length should be greater than 6" required hintText="Password" type="password" floatingLabelText="Password"/>
              <FormsyText className="" name='repeated_password' fullWidth validations="equalsField:password" validationError="Passwords don't match" required hintText="Repeat Password" type="password" floatingLabelText="Repeat Password"/>
            <RaisedButton className="" label="Update Profile" type="submit" primary={true} disabled={!this.state.canSubmit}/>
          </Formsy.Form>
        </div>
      </Dialog>
    );
  }
}

export default ProfileEdit;
