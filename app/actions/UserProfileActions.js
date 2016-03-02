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
          this.updateError(err);
        } else if(result && result.body.error) {
          this.updateError(result.body);
        } else {
          this.updateSuccess(result.body);
        }
      });
  }

  updateSuccess(user) {
    return user;
  }

  updateError(err) {
    return err;
  }
}

export default alt.createActions(UserProfileActions);
