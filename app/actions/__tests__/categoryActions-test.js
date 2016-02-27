import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import CategoryActions from '../categoryActions';

describe('Category Actions tests', () =>  {
  describe('Simulate category fetch success', () => {
    let response = {
      body: ['a', 'b', 'c'],
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(CategoryActions, 'updateCategory').returns(true);
      sinon.stub(CategoryActions, 'handleError').returns(true);
      sinon.spy(CategoryActions, 'fetchCategory');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      CategoryActions.updateCategory.restore();
      CategoryActions.handleError.restore();
      CategoryActions.fetchCategory.restore();
    });

    it('calls fetchCategory function', () => {
      CategoryActions.fetchCategory();
      expect(CategoryActions.fetchCategory.called).toBe(true);
      expect(CategoryActions.updateCategory.called).toBe(true);
    });
  });

  describe('simulate category fetch error', () => {
    let err = {
      body: {
        error: 'could not fetch'
      },
      statusCode: 406
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      sinon.stub(CategoryActions, 'handleError').returns(true);
      sinon.spy(CategoryActions, 'fetchCategory');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      CategoryActions.handleError.restore();
      CategoryActions.fetchCategory.restore();
    });

    it('returns an error', () => {
      CategoryActions.fetchCategory();
      expect(CategoryActions.fetchCategory.called).toBe(true);
      expect(CategoryActions.handleError.called).toBe(true);
    });

    it('called fetchcategory on error', () => {
      CategoryActions.fetchCategory();
      expect(CategoryActions.fetchCategory.called).toBe(true);
    });
  });
});
