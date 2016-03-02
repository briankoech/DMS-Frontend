import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import SignupActions from '../SignupActions';
import alt from '../../alt';

describe('Signup Actions tests', () =>  {
  describe('Signup dispatches the data', () => {
    let dispatcherSpy;
    let signupSuccessSpy;
    let signupErrorSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      signupSuccessSpy = sinon.spy(SignupActions, 'signupSuccess');
      signupErrorSpy = sinon.spy(SignupActions, 'signupError');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      SignupActions.signupSuccess.restore();
      SignupActions.signupError.restore();
    });

    it('dispatches correct data', () => {
      let user = 'Brian',
        action = SignupActions.SIGNUP_SUCCESS;

      // fire the action
      SignupActions.signupSuccess(user);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(user);
    });

  });
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

    it('dispatches an error on request err', () => {
      let err = 'error';
      let user = {name: 'koech'};
      request.Request.prototype.end.restore();
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupError.called).toBe(true);
    });
  });
});
