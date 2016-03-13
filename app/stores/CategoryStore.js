import alt from '../alt';
import CategoryActions from '../actions/CategoryActions.js';

class CategoryStore {
  constructor() {

    this.state = {categories: [], error: ''};
    this.bindListeners({
      fetchCategory: CategoryActions.fetchCategory,
      updateCategory: CategoryActions.categorySuccessDispatcher,
      handleError: CategoryActions.categoryErrorDispatcher
    });
  }

  fetchCategory(cats) {
    this.setState({categories: '', err: ''});
  }

  updateCategory(categories) {
    this.setState({categories: categories})
  }

  handleError(err) {
    this.setState({error: err});
  }
}

export default alt.createStore(CategoryStore, 'CategoryStore');
