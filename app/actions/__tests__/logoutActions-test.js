import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import LogoutActions from '../LogoutActions';
import alt from '../../alt';

describe('Logout Actions tests', () => {
  describe('Logout success actions tests', () => {
    let response = {
      body: 'logout success',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(LogoutActions, 'logoutSuccessDispatcher').returns(true);
      sinon.spy(LogoutActions, 'logoutUser');
      sinon.spy(LogoutActions, 'logoutErrorDispatcher');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LogoutActions.logoutSuccessDispatcher.restore();
      LogoutActions.logoutUser.restore();
      LogoutActions.logoutErrorDispatcher.restore();
    });

    it('calls logoutUser function', () => {
      let token = 'xsvxsyhshxs';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutSuccessDispatcher.called).toBe(true);
    });

    it('returns message on logout', () => {
      let token = 'knfj';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutSuccessDispatcher.calledWithMatch(/success/)).toBe(true);
    });

    it('throws an error on err', () => {
      let res = {
        body: {error: 'error occured'}
      }
      request.Request.prototype.end.restore();
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, res);
      });
      let token = 'knfj';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutErrorDispatcher.called).toBe(true);
    });
  });

  describe('Logout error actions tests', () => {
    let err = {
      error: 'could not logout user',
      statusCode: 500
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      sinon.stub(LogoutActions, 'logoutErrorDispatcher').returns(true);
      sinon.spy(LogoutActions, 'logoutUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LogoutActions.logoutErrorDispatcher.restore();
      LogoutActions.logoutUser.restore();
    });

    it('calls logoutErrorDispatcher function', () => {
      let token = 'xsvxsyhshxs';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutErrorDispatcher.called).toBe(true);
    });

    it('returns an error message', () => {
      let token = 'knfj';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutErrorDispatcher.called).toBe(true);
    });
  });

  describe('Dispatches data successfully Actions', () => {
    let dispatcherSpy;
    let logoutSuccessDispatcherSpy;
    let logoutErrorDispatcherSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      logoutSuccessDispatcherSpy = sinon.spy(LogoutActions, 'logoutSuccessDispatcher');
      logoutErrorDispatcherSpy = sinon.spy(LogoutActions, 'logoutErrorDispatcher');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      LogoutActions.logoutSuccessDispatcher.restore();
      LogoutActions.logoutErrorDispatcher.restore();
    });

    it('dispatches correct data', () => {
      let data = 'logout successfully',
        action = LogoutActions.LOGOUT_SUCCESS_DISPATCHER;

      // fire the action
      LogoutActions.logoutSuccessDispatcher(data);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(data);
    });

    it('dispatches an error', () => {
      let error = 'error',
        action = LogoutActions.LOGOUT_ERROR_DISPATCHER;

      // fire the action
      LogoutActions.logoutErrorDispatcher(error);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(error);
    });
  });
});
