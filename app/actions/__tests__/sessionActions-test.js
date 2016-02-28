import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import SessionActions from '../SessionActions';

describe('Session Actions tests', () =>  {
  describe('Simulate session success', () => {
    let response = {
      body: 'response',
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(SessionActions, 'sessionSuccess').returns(true);
      sinon.stub(SessionActions, 'invalidSession').returns(true);
      sinon.spy(SessionActions, 'getSession');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SessionActions.sessionSuccess.restore();
      SessionActions.invalidSession.restore();
      SessionActions.getSession.restore();
    });

    it('calls getSession function', () => {
      let token = 'xbhbhbsx';
      SessionActions.getSession(token);
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.sessionSuccess.called).toBe(true);
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
      sinon.stub(SessionActions, 'sessionSuccess').returns(false);
      sinon.stub(SessionActions, 'invalidSession').returns(true);
      sinon.spy(SessionActions, 'getSession');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      SessionActions.invalidSession.restore();
      SessionActions.sessionSuccess.restore();
      SessionActions.getSession.restore();
    });

    it('returns an invalid session', () => {
      let token = 'vdjgushuid';
      SessionActions.getSession(token);
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.invalidSession.called).toBe(true);
    });

    it('fails to call sessionSuccess on invalid session', () => {
      SessionActions.getSession();
      expect(SessionActions.getSession.called).toBe(true);
      expect(SessionActions.sessionSuccess.called).toBe(false);
    });
  });
});
