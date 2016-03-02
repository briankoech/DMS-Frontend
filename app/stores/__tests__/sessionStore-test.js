import React from 'react';
import expect from 'expect';
import request from 'superagent';
import {spy, stub} from 'sinon';
import alt from '../../alt';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../SessionStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Session Store tests', () => {
  it('listens for session Actions', () => {
    stub(alt.dispatcher, 'dispatch').returns(true);
    let user = {username: 'koech', id: 123};
    let action = SessionActions.SESSION_SUCCESS;
    alt.dispatcher.dispatch({action, user});
    expect(alt.dispatcher.dispatch.called).toBe(true);
    alt.dispatcher.dispatch.restore();
  });

});
