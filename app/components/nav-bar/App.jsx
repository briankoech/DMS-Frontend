import React from 'react';
import SideCard from '../side-bar/SideCard.jsx';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import Login from '../login-page/Login.jsx';
import Signup from '../signup-page/Signup.jsx';
import ProfileEdit from './ProfileEdit-page.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CategoryList from '../side-bar/Category-list.jsx';
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Divider from 'material-ui/lib/divider';

import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import LogoutActions from '../../actions/LogoutActions';
import LogoutStore from '../../stores/LogoutStore';
import { browserHistory } from 'react-router';

import Link from 'react-router';
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openlogin: false,
      opensignup: false,
      opensnackbar: false,
      snackbarmsg: '',
      isLoggedIn: false,
      username: null,
      email: null,
      openprofile: false,
      canSubmit: false
    };

    this.onSession = this.onSession.bind(this);
  }

  static propTypes = {
      params: React.PropTypes.object
  };

  // static getStores(props) {
  //   return [SessionStore];
  // }
  //
  // static getPropsFromStores(props) {
  //   return SessionStore.getState()
  // }


  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    console.log('Mounted');
    // listen for store changes
    SessionStore.listen(this.onSession);
    LogoutStore.listen(this.onLogout);
  }

  onSession = (state) => {
    if(!state.error && state.user) {
      this.setState({isLoggedIn: true, username: state.user.username, email: state.user.email});
    } else {
      this.setState({isLoggedIn: false});
    }
  };

  handleToggle = () => {this.setState({open: !this.state.open}); console.log('Cliked');};

  handleClose = () => this.setState({open: false});

  handleLogin = () => this.setState({openlogin: true, opensignup: false});

  handleloginclose = () => this.setState({openlogin: false});

  handlesignup = () => this.setState({opensignup: true, openlogin: false});

  handlesignupclose = () => this.setState({opensignup: false});

  handleSnackBar = (msg) => {
    this.setState({opensnackbar: true, snackbarmsg: msg});
  };

  handleSnackBarClose = () => this.setState({opensnackbar: false});

  handleprofile = () => this.setState({openprofile: true});

  handleprofileclose = () => this.setState({openprofile: false});

  handleLogout = () => {
    let token = localStorage.getItem('x-access-token');
    LogoutActions.logoutUser(token);
  };

  onLogout = (state) => {
    if(state.success && !state.error) {
      localStorage.removeItem('x-access-token');
      SessionActions.getSession(null);
      browserHistory.push('/');
    }
  };

  refresh = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <AppBar
          className="navbar"
          id="navbar"
          title={<span style={{cursor: 'pointer'}}>DMS</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle}>
              <FontIcon className="muidocs-icon-action-home" color={Colors.red500}><i className="fa fa-bars"></i></FontIcon>
            </IconButton>
          }
          iconElementRight={
            (this.state.isLoggedIn) ?
            <div>
              <RaisedButton label="Create Document" linkButton href="/create" primary={true} style={{margin: 10}}/>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Refresh" onTouchTap={this.refresh}/>
                  <MenuItem primaryText="My profile" onTouchTap={this.handleprofile}/>
                  <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout}/>
                </IconMenu>
            </div>
          : <FlatButton label="Login" style={{color: 'red'}} onTouchTap={this.handleLogin}/>
          }
          style={{backgroundColor: '#FFF', position: 'fixed', boxShadow: 'none'}}
        />
      <Login
        openlogin={this.state.openlogin}
        onClick={this.handleloginclose.bind(this)}
        signupAction={this.handlesignup.bind(this)}
        snackbar={this.handleSnackBar.bind(this)}
      />
      <Signup
        opensignup={this.state.opensignup}
        onClick={this.handlesignupclose.bind(this)}
        loginAction={this.handleLogin.bind(this)}
      />
      <ProfileEdit
        openprofile={this.state.openprofile}
        onClick={this.handleprofileclose.bind(this)}
      />
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          {
            this.state.isLoggedIn ?
              <SideCard username={this.state.username} email={this.state.email}/>
            : <SideCard />
          }
          <a href="/">
            <MenuItem
              onTouchTap={ () => {
                this.handleClose();
              }}
            >
              <i style={{color: '#2196F3'}} className="fa fa-home"></i> Home
            </MenuItem>
          </a>
          <Divider />
          <CategoryList isLoggedIn={this.state.isLoggedIn} closeNav={this.handleClose}/>
          <Divider />
        </LeftNav>
        <Snackbar
         open={this.state.opensnackbar}
         message={this.state.snackbarmsg}
         autoHideDuration={4000}
         onRequestClose={this.handleSnackBarClose}
       />
      </div>
    );
  }
}

export default App;
