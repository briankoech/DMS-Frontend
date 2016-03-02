import alt from '../alt';
import LogoutActions from '../actions/LogoutActions';

class LogoutStore {
  constructor() {
    this.state = {message: '', error: null, success: false};
    this.bindListeners({
      handleLogout: LogoutActions.logoutUser,
      logoutSuccess: LogoutActions.logoutSuccess,
      logoutError: LogoutActions.logoutError
    });
  }

  handleLogout() {
    this.setState({message: '', error: ''})
  }
  logoutSuccess(message) {
    this.setState({message: message, error: null, success: true})
  }
  logoutError(err) {
    this.setState({error: err});
  }
}

export default alt.createStore(LogoutStore);
