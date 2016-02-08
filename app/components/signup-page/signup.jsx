import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import SignupAction from '../../actions/signupActions.js';
import SignupStore from '../../stores/SignupStore';
import connectToStores from 'alt-utils/lib/connectToStores';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmpassword: '',
    }

    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getStores(props) {
    return [SignupStore];
  }

  static getPropsFromStores(props) {
    // called when stores experience change in state
    console.log('signup change occured');
    return SignupStore.getState();
  }

  componentDidMount() {
   SignupStore.listen(this.onChange);
  }

  onChange(state) {
    console.log(state);
    if(state && state.message) {
      // redirect
      console.log('success');
    } else {
      console.log('error');
    }
  }
  handleFieldChange (e) {
  //  console.log(this);
     let field = e.target.name;
     let value = e.target.value;
     if(field === 'username') {
       this.setState({username: value});
     } else if(field === 'email') {
       this.setState({email: value});
     } else if(field === 'firstname') {
       this.setState({firstname: value});
     } else if(field === 'lastname') {
       this.setState({lastname: value});
     } else if(field === 'password') {
       this.setState({password: value});
     } else {
       this.setState({confirmpassword: value});
     }
     //console.log(this.state.username);
  }

  handleCreateUser() {
    let user = {
      username: this.state.username,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password,
    };
    console.log(user);
   SignupAction.createUser(user);
  }

  render() {
    return (
        <Dialog
          actionsContainerClassName=""
          bodyClassName=""
          modal={false}
          open={this.props.opensignup}
          onRequestClose={this.props.onClick}
          autoScrollBodyContent
        >
        <div className="signup">
          <h3 className="">Sign up</h3>
          <p className="">To save stories or get stories, edit or delete – all free.</p>
          <hr/>

          <TextField
            className=""
            hintText="johndoe"
            floatingLabelText="Username"
            fullWidth
            name="username"
            onChange={this.handleFieldChange}
          />
          <br />
          <TextField
            className=""
            hintText="johndoe@example.com"
            floatingLabelText="Email"
            fullWidth
            name="email"
            type="email"
            required
            onChange={this.handleFieldChange}
          />
          <TextField
            className=""
            hintText="John"
            floatingLabelText="firstname"
            fullWidth
            name="firstname"
            onChange={this.handleFieldChange}
          />
          <TextField
            className=""
            hintText="Doe"
            floatingLabelText="lasname"
            fullWidth
            name="lastname"
            onChange={this.handleFieldChange}
          />
          <br />
          <TextField
            className=""
            floatingLabelText="password"
            type="password"
            fullWidth
            name="password"
            onChange={this.handleFieldChange}
          />
          <br />
          <TextField
            className=""
            floatingLabelText="confirm password"
            type="password"
            fullWidth
            name="confirmpassword"
            onChange={this.handleFieldChange}
          />
          <br />
          <RaisedButton
            className=""
            label="Create account"
            primary={true}
            onTouchTap={this.handleCreateUser}
          />
          <div className="row">
          <p className="">Already have an account?</p>
            <FlatButton
              label="Log In"
              secondary={true}
              onTouchTap={this.props.loginAction}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Signup;
// export default connectToStores(Signup);
