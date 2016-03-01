import alt from '../alt';
import request from 'superagent';

class SessionActions {
  getSession(token) {
    request
      .get('/api/users/session')
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          this.invalidSession(err);
        } else if(res.body.error){
          this.invalidSession(res.body);
        } else {
          this.sessionSuccess(res.body);
        }
      });
  }

  sessionSuccess(user) {
    return user;
  }

  invalidSession(err) {
    return err;
  }
}

export default alt.createActions(SessionActions);
