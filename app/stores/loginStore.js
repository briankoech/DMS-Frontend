import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.state = {message: '', error: '', session: ''};
    this.bindListeners({
      handleLogin: LoginActions.loginUser,
      loginSuccess: LoginActions.loginSuccess,
      loginError: LoginActions.loginError,
    });
  }

  handleLogin() {
    this.setState({message: '', error: ''})
  }
  loginSuccess(message) {
    this.setState({message: message})
  }
  loginError(err) {
    this.setState({error: err});
  }
  handleSession(user) {
    this.setState({session: user});
  }
}

export default alt.createStore(LoginStore);
