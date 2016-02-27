import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import LogoutActions from '../LogoutActions';

describe('Logout Actions tests', () => {
  describe('Logout Actions tests', () =>  {
    let response = {
      body: 'logout success',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(LogoutActions, 'logoutSuccess').returns(true);
      sinon.stub(LogoutActions, 'logoutError').returns(true);
      sinon.spy(LogoutActions, 'logoutUser');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      LogoutActions.logoutSuccess.restore();
      LogoutActions.logoutError.restore();
      LogoutActions.logoutUser.restore();
    });

    it('calls logoutuser function', () => {
      let token = 'xsvxsyhshxs';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutSuccess.called).toBe(true);
    });

    it('returns message on logout', () => {
      let token = 'knfj';
      LogoutActions.logoutUser(token);
      expect(LogoutActions.logoutUser.called).toBe(true);
      expect(LogoutActions.logoutSuccess.calledWithMatch(/success/)).toBe(true);
    });
  });
});
