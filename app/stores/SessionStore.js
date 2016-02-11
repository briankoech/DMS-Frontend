import alt from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.state = {session: {}};
    this.bindListeners({
      handleSession: SessionActions.getSession,
    });
  }

  handleSession(session) {
    console.log(session);
    this.setState({session: session});
  }
}

export default alt.createStore(SessionStore, 'SessionStore');
