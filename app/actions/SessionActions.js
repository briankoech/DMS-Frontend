import alt from '../alt';
import request from 'superagent';

class SessionAction {
  getSession(token) {
    request
      .get('api/users/session')
      .set('x-access-token', token)
      .end((err, res) => {
        if(err) {
          return {error: err};
        } else if(res.body.error){
          this.invalidSession(res.body);
        } else {
          this.sessionSuccess(result.body);
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

export default alt.createActions(SessionAction);
