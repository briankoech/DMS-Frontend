import alt from '../alt';
import request from 'superagent';

class UserProfileActions {
  updateUser(id, user, token) {
    request
      .put(`/api/users/${id}`)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .end((err, result) => {
        if(err) {
          this.updateErrorDispatcher(err);
        } else if(result && result.body.error) {
          this.updateErrorDispatcher(result.body);
        } else {
          this.updateSuccessDispatcher(result.body);
        }
      });
  }

  updateSuccessDispatcher(user) {
    return user;
  }

  updateErrorDispatcher(err) {
    return err;
  }
}

export default alt.createActions(UserProfileActions);
