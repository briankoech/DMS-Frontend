import request from 'superagent';

export get = (url, token) => {
  request
    .get(url)
    .set('x-access-token', token)
    .end((err, result) => {
      return result.body;
    });
};

export post = (url, data) => {
  request
    .post(url)
    .send(data)
    .end((err, result) => {
      return result.body;
    });
};

export delete = (url, data) => {
  request
    .delete(url)
    .send(data || {})
    .end((err, result) => {
      return result.body;
    });
};

export put = (url, data) => {
  request
    .get(url)
    .send(data)
    .end((err, result) => {
      return result.body;
    });
};
