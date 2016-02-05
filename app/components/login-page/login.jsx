import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
      <FlatButton label="Login" primary={true} onTouchTap={this.handleClose} />,
    ];

    return (
        <Dialog
          actionsContainerClassName=""
          bodyClassName=""
          modal={false}
          open={this.props.openlogin}
          onRequestClose={this.props.onClick}
        >
        <div className="login">
          <h3 className="">Log In</h3>
          <p className="">To save stories or get stories, edit or delete – all free.</p>
          <hr/>
          <TextField
            className=""
            hintText="johndoe"
            floatingLabelText="Username"
          />
          <br />
          <TextField
            className=""
            hintText="johndoe"
            floatingLabelText="password"
            type="password"
          />
          <Checkbox
            className=""
            label="Remember me"
            defaultChecked={true}
          />
        <a className="" href="">Forgot password?</a>
          <br />
          <a className="" href="">Terms of service</a>
          <a className="" href="">Privacy Policy</a>
          <br />
          <RaisedButton className="" label="Log in" secondary={true} onTouchTap={this.handleClose} />
          <p className="">Don't have an account?
            <FlatButton
              label="Sign up"
              secondary={true}
              onTouchTap={this.props.signupAction}
            />
          </p>
        </div>
      </Dialog>
    );
  }
}
