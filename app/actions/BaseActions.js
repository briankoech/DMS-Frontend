import request from 'superagent';

export default class BaseActions {
  constructor() {
    //super();
  }

  get = (url) => {
    request
      .get(url)
      .end((err, result) => {
        return result.body;
      });
  }

  post = (url, data) => {
    request
      .post(url)
      .send(data)
      .end((err, result) => {
        return result.body;
      });
  }

  delete = (url, data) => {
    request
      .delete(url)
      .send(data || {})
      .end((err, result) => {
        return result.body;
      });
  }

  put = (url, data) => {
    request
      .get(url)
      .send(data)
      .end((err, result) => {
        return result.body;
      });
  }
}
