import React from 'react';
import expect from 'expect';
import request from 'superagent';
import {spy} from 'sinon';
import alt from '../../alt';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../LoginStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Login Store tests', () => {
  it('listens for login Actions', () => {
    spy(alt.dispatcher, 'dispatch');
    let message = 'success';
    let action = LoginActions.LOGIN_SUCCESS;
    alt.dispatcher.dispatch.restore();
    alt.dispatcher.dispatch({action, message});
    expect(typeof LoginStore.getState().message).toBe('string');
  });

});
