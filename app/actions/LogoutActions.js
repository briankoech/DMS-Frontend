import alt from '../alt';
import request from 'superagent';

class LogoutActions {
  logoutUser(token) {
    request
      .post('/api/users/logout')
      .set('x-access-token', token)
      .end((err, result) => {
        if(err) {
          this.userError(err);
        } else if(result && result.body.error) {
          this.userError(result.body);
        } else {
          this.logoutSuccess(result.body);
        }
      });
  }

  logoutSuccess(data) {
    return data;
  }

  logoutError(err) {
    return err;
  }
}

export default alt.createActions(LogoutActions);
