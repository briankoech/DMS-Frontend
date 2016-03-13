import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import SessionActions from '../SessionActions';
import alt from '../../alt';

describe('Session Actions tests', () => {
  describe('Dispatches user object or error on session', () => {
    let dispatcherSpy;
    let sessionSuccessDispatcherSpy;
    let invalidSessionDispatcherSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      sessionSuccessDispatcherSpy = sinon.spy(SessionActions, 'sessionSuccessDispatcher');
      invalidSessionDispatcherSpy = sinon.spy(SessionActions, 'invalidSessionDispatcher');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      SessionActions.sessionSuccessDispatcher.restore();
      SessionActions.invalidSessionDispatcher.restore();
    });

    it('dispatches user on session success data', () => {
      let data = 'user',
        action = SessionActions.SESSION_SUCCESS_DISPATCHER;

      // fire the action
      SessionActions.sessionSuccessDispatcher(data);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(data);
    });

    it('dispatches an error', () => {
      let error = 'error',
        action = SessionActions.INVALID_SESSION_DISPATCHER;

      // fire the action
      SessionActions.invalidSessionDispatcher(error);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(error);
    });
  });

  describe('Simulate session success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(SessionActions, 'sessionSuccessDispatcher').returns(true);
      sinon.stub(SessionActions, 'invalidSessionDispatcher').returns(true);
      sinon.spy(SessionActions, 'getSession');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SessionActions.sessionSuccessDispatcher.restore();
      SessionActions.invalidSessionDispatcher.restore();
      SessionActions.getSession.restore();
    });

    it('calls getSession function', () => {
      let token = 'xbhbhbsx';
      SessionActions.getSession(token);
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.sessionSuccessDispatcher.called).toBe(true);
    });
  });

  describe('simulate session error', () => {
    let response = {
      body: {
        error: 'invalid session'
      },
      statusCode: 406
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(SessionActions, 'sessionSuccessDispatcher').returns(false);
      sinon.stub(SessionActions, 'invalidSessionDispatcher').returns(true);
      sinon.spy(SessionActions, 'getSession');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SessionActions.invalidSessionDispatcher.restore();
      SessionActions.sessionSuccessDispatcher.restore();
      SessionActions.getSession.restore();
    });

    it('returns an invalid session', () => {
      let token = 'vdjgushuid';
      SessionActions.getSession(token);
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.invalidSessionDispatcher.called).toBe(true);
    });

    it('fails to call sessionSuccessDispatcher on invalid session', () => {
      SessionActions.getSession();
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.sessionSuccessDispatcher.called).toBe(false);
    });

    it('returns an error on request err', () => {
      let err = 'error';
      let token = 'abc';
      request.Request.prototype.end.restore();
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      SessionActions.getSession(token);
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.invalidSessionDispatcher.called).toBe(true);
    });
  });
});
