import alt from '../alt';
import SignupAction from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.state = {
      message: {},
      error: null
    }

    this.bindListeners({
      handleSignup: SignupAction.createUser,
      handleSignupSuccess: SignupAction.signupSuccess,
      handleError: SignupAction.signupError
    });
  }

  handleSignup() {
    // while it is signing up
    this.setState({message: {}, error: ''})
  }

  handleSignupSuccess(user) {
    this.setState({message: user})
  }

  handleError(err) {
    this.setState({error: err, message: null})
  }
}

export default alt.createStore(SignupStore);
