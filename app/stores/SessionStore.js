import alt from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.state = {user: [], error: null};
    this.bindListeners({
      handleSession: SessionActions.getSession,
      handleSessionSuccess: SessionActions.sessionSuccess,
      handleSessionError: SessionActions.invalidSession
    });
  }

  handleSession(session) {
    this.setState({user: []});
  }

  handleSessionSuccess(user) {
    this.setState({user: user});
  }

  handleSessionError(error) {
    this.setState({error: error});
  }
}

export default alt.createStore(SessionStore, 'SessionStore');
