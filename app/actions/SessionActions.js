import alt from '../alt';
import request from 'superagent';

class SessionAction {
  getSession(token) {
    request
      .get('/api/users/session')
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          this.invalidSessionDispatcher(err);
        } else if(res.body.error) {
          this.invalidSessionDispatcher(res.body);
        } else {
          this.sessionSuccessDispatcher(res.body);
        }
      });
  }

  sessionSuccessDispatcher(user) {
    return user;
  }

  invalidSessionDispatcher(err) {
    return err;
  }
}

export default alt.createActions(SessionAction);
