import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import SignupActions from '../../actions/SignupActions';
import SignupStore from '../SignupStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Signup Store tests', () => {
  it('listens for signup Actions', () => {
    stub(alt.dispatcher, 'dispatch').returns(true);
    let message = 'success';
    let action = SignupActions.HANDLE_SIGNUP_SUCCESS;
    alt.dispatcher.dispatch({action, message});
    expect(alt.dispatcher.dispatch.called).toBe(true);
    alt.dispatcher.dispatch.restore();
  });

});
