import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import UserProfileActions from '../UserProfileActions';
import alt from '../../alt';

describe('UserProfileActions Actions tests', () =>  {
  describe('UserProfileActions dispatches the correct data', () => {
    let dispatcherSpy;
    let updateSuccessDispatcherSpy;
    let updateErrorDispatcherSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      updateSuccessDispatcherSpy = sinon.spy(UserProfileActions, 'updateSuccessDispatcher');
      updateErrorDispatcherSpy = sinon.spy(UserProfileActions, 'updateErrorDispatcher');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      UserProfileActions.updateSuccessDispatcher.restore();
      UserProfileActions.updateErrorDispatcher.restore();
    });

    it('dispatches correct data', () => {
      let user = 'Brian',
        action = UserProfileActions.UPDATE_SUCCESS_DISPATCHER;

      // fire the action
      UserProfileActions.updateSuccessDispatcher(user);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(user);
    });

    it('dispatches correct data', () => {
      let error = 'error',
        action = UserProfileActions.UPDATE_ERROR_DISPATCHER;

      // fire the action
      UserProfileActions.updateErrorDispatcher(error);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(error);
    });

  });
  describe('Simulate update success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(UserProfileActions, 'updateSuccessDispatcher').returns(true);
      sinon.stub(UserProfileActions, 'updateErrorDispatcher').returns(true);
      sinon.spy(UserProfileActions, 'updateUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      UserProfileActions.updateSuccessDispatcher.restore();
      UserProfileActions.updateErrorDispatcher.restore();
      UserProfileActions.updateUser.restore();
    });

    it('calls updateUser function', () => {
      let user = {name: 'abc123'};
      UserProfileActions.updateUser(user);
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateSuccessDispatcher.called).toBe(true);
    });
  });

  describe('simulate update error', () => {
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
      sinon.stub(UserProfileActions, 'updateSuccessDispatcher').returns(false);
      sinon.stub(UserProfileActions, 'updateErrorDispatcher').returns(true);
      sinon.spy(UserProfileActions, 'updateUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      UserProfileActions.updateErrorDispatcher.restore();
      UserProfileActions.updateSuccessDispatcher.restore();
      UserProfileActions.updateUser.restore();
    });

    it('returns as update error', () => {
      let user = {name: 'abc'};
      UserProfileActions.updateUser(user);
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateErrorDispatcher.called).toBe(true);
    });

    it('fails to call updateSuccessDispatcher on invalid data', () => {
      UserProfileActions.updateUser();
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateSuccessDispatcher.called).toBe(false);
    });

    it('dispatches an error on request err', () => {
      let err = 'error';
      let user = {name: 'koech'};
      request.Request.prototype.end.restore();
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      UserProfileActions.updateUser(user);
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateErrorDispatcher.called).toBe(true);
    });
  });
});
