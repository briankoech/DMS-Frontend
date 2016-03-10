import request from 'superagent';

module.exports = {
  get : (url) => {
    console.log('Called');
    request
      .get(url)
      .set('x-access-token', localStorage.getItem('x-access-token'))
      .end((err, result) => {
        console.log(result.body);
        return result.body;
      });
  },

  post : (url, data) => {
    request
      .post(url)
      .send(data)
      .end((err, result) => {
        if(err) {
          return {error: err};
        } else if (result && result.body.error) {
          return {error: result.body};
        } else {
          return result.body;
        }
      });
  },

  remove : (url) => {
    request
      .delete(url)
      .end((err, result) => {
        return result.body;
      });
  },

  put : (url, data) => {
    request
      .get(url)
      .send(data)
      .end((err, result) => {
        return result.body;
      });
  }
}
