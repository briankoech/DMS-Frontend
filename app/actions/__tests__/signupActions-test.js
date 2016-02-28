import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import SignupActions from '../signupActions';

describe('Signup Actions tests', () =>  {
  describe('Simulate signup success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(SignupActions, 'signupSuccess').returns(true);
      sinon.stub(SignupActions, 'signupError').returns(true);
      sinon.spy(SignupActions, 'createUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SignupActions.signupSuccess.restore();
      SignupActions.signupError.restore();
      SignupActions.createUser.restore();
    });

    it('calls createUser function', () => {
      let user = {name: 'abc123'};
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupSuccess.called).toBe(true);
    });
  });

  describe('simulate signup error', () => {
    let response = {
      body: {
        error: 'error occured'
      },
      statusCode: 406
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(SignupActions, 'signupSuccess').returns(false);
      sinon.stub(SignupActions, 'signupError').returns(true);
      sinon.spy(SignupActions, 'createUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SignupActions.signupError.restore();
      SignupActions.signupSuccess.restore();
      SignupActions.createUser.restore();
    });

    it('returns as signup error', () => {
      let user = {name: 'abc'};
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupError.called).toBe(true);
    });

    it('fails to call signupSuccess on invalid data', () => {
      SignupActions.createUser();
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupSuccess.called).toBe(false);
    });
  });
});
