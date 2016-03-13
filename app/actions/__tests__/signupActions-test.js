import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import SignupActions from '../SignupActions';
import alt from '../../alt';

describe('Signup Actions tests', () =>  {
  describe('Signup dispatches the data', () => {
    let dispatcherSpy;
    let signupSuccessDispatcherSpy;
    let signupErrorDispatcherSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      signupSuccessDispatcherSpy = sinon.spy(SignupActions, 'signupSuccessDispatcher');
      signupErrorDispatcherSpy = sinon.spy(SignupActions, 'signupErrorDispatcher');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      SignupActions.signupSuccessDispatcher.restore();
      SignupActions.signupErrorDispatcher.restore();
    });

    it('dispatches correct data', () => {
      let user = 'Brian',
        action = SignupActions.SIGNUP_SUCCESS_DISPATCHER;

      // fire the action
      SignupActions.signupSuccessDispatcher(user);
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
      sinon.stub(SignupActions, 'signupSuccessDispatcher').returns(true);
      sinon.stub(SignupActions, 'signupErrorDispatcher').returns(true);
      sinon.spy(SignupActions, 'createUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SignupActions.signupSuccessDispatcher.restore();
      SignupActions.signupErrorDispatcher.restore();
      SignupActions.createUser.restore();
    });

    it('calls createUser function', () => {
      let user = {name: 'abc123'};
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupSuccessDispatcher.called).toBe(true);
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
      sinon.stub(SignupActions, 'signupSuccessDispatcher').returns(false);
      sinon.stub(SignupActions, 'signupErrorDispatcher').returns(true);
      sinon.spy(SignupActions, 'createUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SignupActions.signupErrorDispatcher.restore();
      SignupActions.signupSuccessDispatcher.restore();
      SignupActions.createUser.restore();
    });

    it('returns as signup error', () => {
      let user = {name: 'abc'};
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupErrorDispatcher.called).toBe(true);
    });

    it('fails to call signupSuccessDispatcher on invalid data', () => {
      SignupActions.createUser();
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupSuccessDispatcher.called).toBe(false);
    });

    it('dispatches an error on request err', () => {
      let err = {
        response : {
          body: {
            message: 'error'
          }
        }
      };
      let user = {name: 'koech'};
      request.Request.prototype.end.restore();
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      SignupActions.createUser(user);
      expect(SignupActions.createUser.called).toBe(true);
      expect(SignupActions.signupErrorDispatcher.called).toBe(true);
    });
  });
});
