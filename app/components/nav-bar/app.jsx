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
import CategoryList from '../side-bar/Category-list.jsx';
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';

import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../stores/LoginStore';

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
      isLoggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }
  componentWillMount() {
    this.userLoggedIn();
  }
  userLoggedIn() {
    var token = localStorage.getItem('x-access-token');
    var user = JSON.parse(localStorage.getItem('user')) || {};
    if(token && (user.title === 'admin' || user.title === 'contributor')) {
      // verify if user is logged in
      this.setState({isLoggedIn: true});
    }
  }
  static getStores(props) {
    return [SessionStore, LoginStore];
  }

  static getPropsFromStores(props) {
    console.log('changes');
    return {
        Session: SessionStore.getState(),
        Login: LoginStore.getState(),
      };
  }
  componentWillReceiveProps(nextProps) {
    this.userLoggedIn();
  }
  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  componentDidMount() {
    console.log('Mounted');
    // listen for store changes
    SessionStore.listen(this.onChange);
    LoginStore.listen(this.isLoggedIn);
  }

  isLoggedIn(state) {
    if(state.message) {
      console.log('user logged in', state);
    }
  }

  onChange(state) {
    console.log('USER', this.state.user);
    this.setState({user: state});
  }
  handleToggle = () => {this.setState({open: !this.state.open}); console.log('Cliked');};

  handleClose = () => this.setState({open: false});

  handleLogin = () => this.setState({openlogin: true, opensignup: false});

  handleloginclose = () => this.setState({openlogin: false});

  handlesignup = () => this.setState({opensignup: true, openlogin: false});

  handlesignupclose = () => this.setState({opensignup: false});

  handleSnackBar = () => this.setState({opensnackbar: true});

  handleSnackBarClose = () => this.setState({opensnackbar: false});

  handleTitleTouchTap = () => {
    console.log('fjkbshfj');
  };


  render() {
    return (
      <div>
        <AppBar
          title={<span style={{cursor: 'pointer'}}>DMS</span>}
          onTitleTouchTap={this.handleTitleTouchTap}
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle}>
              <FontIcon className="muidocs-icon-action-home"><i className="fa fa-bars"></i></FontIcon>
            </IconButton>
          }
          iconElementRight={
            (this.state.isLoggedIn) ? <RaisedButton label="Create Document" linkButton href="/create" primary={true} style={{margin: 10}}/>
                : <FlatButton label="Login" onTouchTap={this.handleLogin}/>
          }
          style={{backgroundColor: '#2196F3', position: 'fixed'}}
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
        snackbar={this.handleSnackBar.bind(this)}
      />
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <SideBar />
          <MenuItem onTouchTap={this.handleClose}> <i className="fa fa-home"></i> Home</MenuItem>
          <CategoryList />
        </LeftNav>
        <Snackbar
         open={this.state.opensnackbar}
         message="Welcome to DMS"
         autoHideDuration={4000}
         onRequestClose={this.handleSnackBarClose}
       />
      </div>
    );
  }
}

export default connectToStores(App);
