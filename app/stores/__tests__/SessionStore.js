import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../SessionStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Session Store tests', () => {
  it('listens for session Actions', () => {
    let user = {username: 'koech', id: 123};
    let action = SessionActions.SESSION_SUCCESS;
    alt.dispatcher.dispatch({action, user});
    expect(typeof SessionStore.getState().user).toBe('object');
  });

});
