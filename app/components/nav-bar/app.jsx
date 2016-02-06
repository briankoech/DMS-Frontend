import React from 'react';
import SideBar from '../side-bar/side-card.jsx';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import Login from '../login-page/login.jsx';
import Signup from '../signup-page/signup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false, openlogin: false, opensignup: false};
  }

  handleToggle = () => {this.setState({open: !this.state.open}); console.log('Cliked');};

  handleClose = () => this.setState({open: false});

  handleLogin = () => this.setState({openlogin: true, opensignup: false});

  handleloginclose = () => this.setState({openlogin: false});

  handlesignup = () => this.setState({opensignup: true, openlogin: false});

  handlesignupclose = () => this.setState({opensignup: false});

  render() {
    return (
      <div>
        <AppBar
          title="DMS"
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle}>
              <FontIcon className="muidocs-icon-action-home"><i className="fa fa-bars"></i></FontIcon>
            </IconButton>
          }
          iconElementRight={
              <FlatButton label="Login" onTouchTap={this.handleLogin}/>
            }
        />
      <Login
        openlogin={this.state.openlogin}
        onClick={this.handleloginclose.bind(this)}
        signupAction={this.handlesignup.bind(this)}
      />
      <Signup
        opensignup={this.state.opensignup}
        onClick={this.handlesignupclose.bind(this)}
        loginAction={this.handleLogin.bind(this)}
      />
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <SideBar />
          <MenuItem onTouchTap={this.handleClose}> <i className="fa fa-home"></i> Home</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
