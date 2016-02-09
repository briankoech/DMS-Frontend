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
          console.log(err);
          this.signupError({error: err});
        } else if(result && result.body.error) {
          this.signupError(result.body)
        } else {
          this.signupSuccess(result.body);
        }
      });
  }

  signupSuccess(user) {
    return user;
  }

  signupError(err) {
    //console.log(err);
    return err;
  }
}

export default alt.createActions(SignupActions);
