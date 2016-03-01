import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import UserProfileActions from '../UserProfileActions';
import alt from '../../alt';

describe('UserProfileActions Actions tests', () =>  {
  describe('UserProfileActions dispatches the correct data', () => {
    let dispatcherSpy;
    let updateSuccessSpy;
    let updateErrorSpy
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      updateSuccessSpy = sinon.spy(UserProfileActions, 'updateSuccess');
      updateErrorSpy = sinon.spy(UserProfileActions, 'updateError');
    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      UserProfileActions.updateSuccess.restore();
      UserProfileActions.updateError.restore();
    });

    it('dispatches correct data', () => {
      let user = 'Brian',
        action = UserProfileActions.UPDATE_SUCCESS;

      // fire the action
      UserProfileActions.updateSuccess(user);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(user);
    });

    it('dispatches correct data', () => {
      let error = 'error',
        action = UserProfileActions.UPDATE_ERROR;

      // fire the action
      UserProfileActions.updateError(error);
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
      sinon.stub(UserProfileActions, 'updateSuccess').returns(true);
      sinon.stub(UserProfileActions, 'updateError').returns(true);
      sinon.spy(UserProfileActions, 'updateUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      UserProfileActions.updateSuccess.restore();
      UserProfileActions.updateError.restore();
      UserProfileActions.updateUser.restore();
    });

    it('calls updateUser function', () => {
      let user = {name: 'abc123'};
      UserProfileActions.updateUser(user);
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateSuccess.called).toBe(true);
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
      sinon.stub(UserProfileActions, 'updateSuccess').returns(false);
      sinon.stub(UserProfileActions, 'updateError').returns(true);
      sinon.spy(UserProfileActions, 'updateUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      UserProfileActions.updateError.restore();
      UserProfileActions.updateSuccess.restore();
      UserProfileActions.updateUser.restore();
    });

    it('returns as update error', () => {
      let user = {name: 'abc'};
      UserProfileActions.updateUser(user);
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateError.called).toBe(true);
    });

    it('fails to call updateSuccess on invalid data', () => {
      UserProfileActions.updateUser();
      expect(UserProfileActions.updateUser.called).toBe(true);
      expect(UserProfileActions.updateSuccess.called).toBe(false);
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
      expect(UserProfileActions.updateError.called).toBe(true);
    });
  });
});
