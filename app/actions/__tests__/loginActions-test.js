import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import LoginActions from '../loginActions';

describe('Login Actions tests', () =>  {
  describe('Simulate login success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(LoginActions, 'loginSuccess').returns(true);
      sinon.stub(LoginActions, 'loginError').returns(true);
      sinon.spy(LoginActions, 'loginUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LoginActions.loginSuccess.restore();
      LoginActions.loginError.restore();
      LoginActions.loginUser.restore();
    });

    it('calls loginuser function', () => {
      let user = {username: 'Brian', password: 'abc123'};
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
      expect(LoginActions.loginSuccess.called).toBe(true);
    });
  });

  describe('simulate error/ invalid credentials response', () => {
    let response = {
      body: {
        error: 'wrong username or password'
      },
      statusCode: 406
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(LoginActions, 'loginError').returns(true);
      sinon.spy(LoginActions, 'loginUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LoginActions.loginError.restore();
      LoginActions.loginUser.restore();
    });

    it('returns an error', () => {
      let user = {username: 'Mark', password: 'abc123'};
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
      expect(LoginActions.loginError.called).toBe(true);
    });

    it('returns an error on wrong credentials', () => {
      let user = 'koech';
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
    });
  });
});
