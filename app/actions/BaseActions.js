import request from 'superagent';

export const get = (url, token) => {
  console.log('Called');
  request
    .get(url)
    .set('x-access-token', token)
    .end((err, result) => {
      console.log(result.body);
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

export const remove = (url) => {
  request
    .delete(url)
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
