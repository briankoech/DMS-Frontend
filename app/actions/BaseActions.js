import request from 'superagent';

export const get = (url, token) => {
  request
    .get(url)
    .set('x-access-token', token)
    .end((err, result) => {
      return result.body;
    });
};

export const post = (url, data) => {
  request
    .post(url)
    .send(data)
    .end((err, result) => {
      return result.body;
    });
};

export const delete = (url, data) => {
  request
    .delete(url)
    .send(data || {})
    .end((err, result) => {
      return result.body;
    });
};

export const put = (url, data) => {
  request
    .get(url)
    .send(data)
    .end((err, result) => {
      return result.body;
    });
};
