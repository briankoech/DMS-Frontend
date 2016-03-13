import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.state = {message: '', error: ''};
    this.bindListeners({
      handleLogin: LoginActions.loginUser,
      loginSuccess: LoginActions.loginSuccessDispatcher,
      loginError: LoginActions.loginErrorDispatcher
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
}

export default alt.createStore(LoginStore, 'LoginStore');
