import alt from '../alt';
import request from 'superagent';

class CategoryAction {
  fetchCategory() {
    request
      .get('/api/categories')
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.handleError({error: err});
        } else {
          this.updateCategory(result.body);
        }
      });
  }

  updateCategory(category) {
    return category;
  }

  handleError(err) {
    return err;
  }
}

export default alt.createActions(CategoryAction);
