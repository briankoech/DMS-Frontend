import alt from '../alt';
import request from 'superagent';

class LoginActions {
  loginUser(user) {
    request
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.loginErrorDispatcher(err);
        } else if(result && result.body.error) {
          this.loginErrorDispatcher(result.body);
        } else {
          this.loginSuccessDispatcher(result.body);
        }
      });
  }

  loginSuccessDispatcher(user) {
    return user;
  }

  loginErrorDispatcher(err) {
    return err;
  }
}

export default alt.createActions(LoginActions);
