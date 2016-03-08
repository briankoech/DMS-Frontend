import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import CategoryActions from '../CategoryActions';
import alt from '../../alt';

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
      sinon.spy(CategoryActions, 'addCategory');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      CategoryActions.updateCategory.restore();
      CategoryActions.handleError.restore();
      CategoryActions.fetchCategory.restore();
      CategoryActions.addCategory.restore();
    });

    it('calls fetchCategory function', () => {
      CategoryActions.fetchCategory();
      expect(CategoryActions.fetchCategory.called).toBe(true);
      expect(CategoryActions.updateCategory.called).toBe(true);
    });

    it('calls add category', () => {
      let type = 'music';
      let token = 'dksndjd';
      CategoryActions.addCategory(type, token);
      expect(CategoryActions.updateCategory.called).toBe(true);
    });

    it('dispatches categories to stores', () => {
      CategoryActions.updateCategory.restore();
      let dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      let updateCategorySpy = sinon.spy(CategoryActions, 'updateCategory');
      let categories = ['music', 'film', 'education'];
      let action = CategoryActions.UPDATE_CATEGORY;
      CategoryActions.updateCategory(categories);

      let dispatcherArgs = dispatcherSpy.args[0];
      let firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(categories);
      alt.dispatcher.dispatch.restore();
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
      sinon.spy(CategoryActions, 'addCategory');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      CategoryActions.handleError.restore();
      CategoryActions.fetchCategory.restore();
      CategoryActions.addCategory.restore();
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

    it('called addCategory on error', () => {
      let type = 'jskf';
      let token = 'djkbvf';
      CategoryActions.addCategory(type, token);
      expect(CategoryActions.handleError.called).toBe(true);
    });
  });
});
