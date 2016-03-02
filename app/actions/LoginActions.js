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
          this.loginError(err);
        } else if(result && result.body.error) {
          this.loginError(result.body);
        } else {
          this.loginSuccess(result.body);
        }
      });
  }

  loginSuccess(user) {
    return user;
  }

  loginError(err) {
    return err;
  }
}

export default alt.createActions(LoginActions);
