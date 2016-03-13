import alt from '../alt';
import request from 'superagent';

class SignupActions {
  createUser(user) {
    request
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.signupErrorDispatcher(err.response.body.message);
        } else if(result && result.body.error) {
          this.signupErrorDispatcher(result.body);
        } else {
          this.signupSuccessDispatcher(result.body);
        }
      });
  }

  signupSuccessDispatcher (user) {
    return user;
  }

  signupErrorDispatcher (err) {
    return err;
  }
}

export default alt.createActions(SignupActions);
