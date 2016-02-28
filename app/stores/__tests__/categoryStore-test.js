import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import CategoryActions from '../../actions/categoryActions.js';
import CategoryStore from '../categoryStore';

describe('Category Store tests', () => {
  it('fetches all categories dispatched', () => {
    console.log('CATEGORYSTORE', CategoryStore);
    //sinon.stub(CategoryStore, 'updateCategory').returns(true);
    sinon.spy(CategoryStore, 'fetchCategory');
    let categories = [{title: 'Music'}, {title: 'Education'}];
    CategoryStore.updateCategory(categories);
    expect(CategoryStore.updateCategory.called).tobe(true);
    expect(CategoryStore.state('categories')).toBeDefined();
    expect(CategoryStore.state('categories').length).toEqual(2);
    CategoryStore.updateCategory.restore();
    CategoryStore.fetchCategory.restore();
  });

  it('listens for Category Actions', () => {
    sinon.stub(CategoryActions, 'updateCategory').returns(true);
    sinon.stub(CategoryActions, 'updateCategory').returns(true);
    let action = CategoryActions.updateCategory();
    let data = ['Music', 'Education', 'Film', 'Programming'];
    alt.dispatcher.dispatch({action, data});
    expect(CategoryStore.getState().categories).toEqual(3);
  });
});
