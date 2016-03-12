import alt from '../alt';
import request from 'superagent';

class LogoutActions {
  logoutUser(token) {
    request
      .post('/api/users/logout')
      .set('x-access-token', token)
      .end((err, result) => {
        if(err) {
          this.logoutErrorDispatcher(err);
        } else if (result && result.body.error) {
          this.logoutErrorDispatcher(result.body);
        } else {
          this.logoutSuccessDispatcher(result.body);
        }
      });
  }

  logoutSuccessDispatcher(data) {
    return data;
  }

  logoutErrorDispatcher(err) {
    return err;
  }
}

export default alt.createActions(LogoutActions);
