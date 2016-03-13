import alt from '../alt';
import request from 'superagent';

class CategoryAction {
  fetchCategory() {
    request
      .get('/api/categories')
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          this.categoryErrorDispatcher({error: err});
        } else {
          this.categorySuccessDispatcher(result.body);
        }
      });
  }

  addCategory(type, token) {
    request
      .post('/api/category')
      .send(type)
      .set('x-access-token', token)
      .end((err, result) => {
        if(err) {
          this.categoryErrorDispatcher({error: err});
        } else {
          this.categorySuccessDispatcher(result.body);
        }
      });
  }
  categorySuccessDispatcher(category) {
    return category;
  }

  categoryErrorDispatcher(err) {
    return err;
  }
}

export default alt.createActions(CategoryAction);
