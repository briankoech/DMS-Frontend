import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserProfileStore {
  constructor() {
    this.state = {user: null, error: null};
    this.bindListeners({
      handleUpdate: UserProfileActions.updateUser,
      updateSuccess: UserProfileActions.updateSuccess,
      updateError: UserProfileActions.updateError
    });
  }

  handleUpdate() {
    this.setState({message: '', error: ''})
  }
  updateSuccess(user) {
    this.setState({user: user});
  }
  updateError(err) {
    this.setState({error: err});
  }
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
