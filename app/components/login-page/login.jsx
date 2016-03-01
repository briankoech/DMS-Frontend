import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import SessionActions from '../../actions/SessionActions';

const FMUI = require('formsy-material-ui');
const {FormsyText} = FMUI;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      canSubmit: false
    }
  }
  // static getStores(props) {
  //   return [LoginStore];
  // }
  //
  // static getPropsFromStores(props) {
  //   // called when stores experience change in state
  //   return LoginStore.getState();
  // }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  onChange = (state) => {
    if (state && state.message.success) {
      this.setState({error: false});
      this.props.snackbar('Welcome to DMS');
      this.props.onClick();
      localStorage.setItem('x-access-token', state.message.token);
      SessionActions.getSession(state.message.token);
    } else if (state && state.error.error) {
      this.setState({error: true});
      this.props.snackbar('Error in login');
    }
  };

  handleLogin = (model) => {
    LoginActions.loginUser(model);
    //resetForm();
  };
  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };
  render() {
    return (
      <Dialog actionsContainerClassName="trial" bodyClassName="loginDialog" modal={false} open={this.props.openlogin} onRequestClose={this.props.onClick} autoScrollBodyContent>
        <div className="login">
          <h3 className="">Log In</h3>
          <p className="">To save stories or get stories, edit or delete – all free.</p>
          <hr/>
          <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleLogin}>
            <FormsyText className="" name='username' validations='isWords' validationError="Please use letters only" required fullWidth hintText="johndoe" floatingLabelText="Username"/>
            <FormsyText className="" name='password' fullWidth validations="minLength:6" validationError="Length should be greater than 6" required hintText="Password" type="password" floatingLabelText="Password"/>

            <div className="row">
              <Checkbox className="" label="Remember me" defaultChecked={true}/>
            </div>
            <div className="row">
              <p style={this.state.error
                ? {
                  display: 'block',
                  color: '#FF0404',
                  'text-align': 'center',
                  'font-size': '1.2em',
                  'font-family': 'monospace'
                }
                : {
                  display: 'none'
                }}>Wrong username/password combination</p>
            </div>
            <div className="row">
              <RaisedButton className="loginbtn" label="Log in" type="submit" primary={true} disabled={!this.state.canSubmit} fullWidth/>
            </div>
          </Formsy.Form>
          <div className="row">
            <RaisedButton style={{
              marginTop: 10
            }} className="signupbtn" label="Sign up" secondary={true} onTouchTap={this.props.signupAction} fullWidth/>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Login;
