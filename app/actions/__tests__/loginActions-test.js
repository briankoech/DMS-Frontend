import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import LoginActions from '../LoginActions';
import alt from '../../alt';

describe('Login Actions tests', () => {
  describe('Login Actions', () => {
    let dispatcherSpy;
    let loginSuccessDispatcherSpy;
    let loginErrorDispatcherSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      loginSuccessDispatcherSpy = sinon.spy(LoginActions, 'loginSuccessDispatcher');
      loginErrorDispatcherSpy = sinon.spy(LoginActions, 'loginErrorDispatcher');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      LoginActions.loginSuccessDispatcher.restore();
      LoginActions.loginErrorDispatcher.restore();
    });

    it('dispatches correct data', () => {
      let user = 'Brian',
        action = LoginActions.LOGIN_SUCCESS_DISPATCHER;

      // fire the action
      LoginActions.loginSuccessDispatcher(user);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(user);
    });

    it('dispatches an error', () => {
      let error = 'error',
        action = LoginActions.LOGIN_ERROR_DISPATCHER;

      // fire the action
      LoginActions.loginErrorDispatcher(error);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      let dispatcherArgs = dispatcherSpy.args[0];
      let firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(error);
    });

  });


  describe('Simulate login success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(LoginActions, 'loginSuccessDispatcher').returns(true);
      sinon.stub(LoginActions, 'loginErrorDispatcher').returns(true);
      sinon.spy(LoginActions, 'loginUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LoginActions.loginSuccessDispatcher.restore();
      LoginActions.loginErrorDispatcher.restore();
      LoginActions.loginUser.restore();
    });

    it('calls loginuser function', () => {
      let user = {
        username: 'Brian',
        password: 'abc123'
      };
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
      expect(LoginActions.loginSuccessDispatcher.called).toBe(true);
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
      sinon.stub(LoginActions, 'loginErrorDispatcher').returns(true);
      sinon.spy(LoginActions, 'loginUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LoginActions.loginErrorDispatcher.restore();
      LoginActions.loginUser.restore();
    });

    it('returns an error', () => {
      let user = {
        username: 'Mark',
        password: 'abc123'
      };
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
      expect(LoginActions.loginErrorDispatcher.called).toBe(true);
    });

    it('returns an error on wrong credentials', () => {
      let user = 'koech';
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
    });
  });

  describe('Test response error', () => {
    let err = {
      error: 'wrong username or password',
      status: 500
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      sinon.stub(LoginActions, 'loginErrorDispatcher').returns(true);
      sinon.spy(LoginActions, 'loginUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LoginActions.loginErrorDispatcher.restore();
      LoginActions.loginUser.restore();
    });

    it('returns an error', () => {
      let user = {
        username: 'Mark',
        password: 'abc123'
      };
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
      expect(LoginActions.loginErrorDispatcher.called).toBe(true);
    });

    it('returns an error on wrong credentials', () => {
      let user = 'koech';
      LoginActions.loginUser(user);
      expect(LoginActions.loginUser.called).toBe(true);
    });
  });
});
