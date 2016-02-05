import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Dialog
          actionsContainerClassName=""
          bodyClassName=""
          modal={false}
          open={this.props.opensignup}
          onRequestClose={this.props.onClick}
        >
        <div className="login">
          <h3 className="">Sign up</h3>
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
            hintText="johndoe@example.com"
            floatingLabelText="Email"
          />
          <br />
          <TextField
            className=""
            floatingLabelText="password"
            type="password"
          />
          <br />
          <TextField
            className=""
            floatingLabelText="confirm password"
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
          <RaisedButton className="" label="Create account" secondary={true} onTouchTap={this.handleClose} />
          <p className="">Already have an account?
            <FlatButton
              label="Log In"
              secondary={true}
              onTouchTap={this.props.loginAction}
            />
          </p>
        </div>
      </Dialog>
      </div>
    );
  }
}
