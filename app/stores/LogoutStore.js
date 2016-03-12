import alt from '../alt';
import LogoutActions from '../actions/LogoutActions';

class LogoutStore {
  constructor() {
    this.state = {message: '', error: null, success: false};
    this.bindListeners({
      handleLogout: LogoutActions.logoutUser,
      logoutSuccess: LogoutActions.logoutSuccessDispatcher,
      logoutError: LogoutActions.logoutErrorDispatcher
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
