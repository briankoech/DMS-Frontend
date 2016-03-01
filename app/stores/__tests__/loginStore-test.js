import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import LoginActions from '../../actions/loginActions';
import LoginStore from '../loginStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Login Store tests', () => {
  it('listens for login Actions', () => {
    let message = 'success';
    let action = LoginActions.LOGIN_SUCCESS;
    alt.dispatcher.dispatch({action, message});
    expect(typeof LoginStore.getState().message).toBe('string');
  });

});
