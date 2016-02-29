import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import CategoryActions from '../../actions/categoryActions';
import CategoryStore from '../categoryStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Category Store tests', () => {
  it('listens for updateCategory Actions', () => {
    let data = ['Music', 'Education', 'Film', 'Programming'];
    let action = CategoryActions.UPDATE_CATEGORY;
    alt.dispatcher.dispatch({action, data});
    expect(CategoryStore.getState().categories.length).toEqual(4);
  });
});
