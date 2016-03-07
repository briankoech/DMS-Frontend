import React from 'react';
import App from '../App.jsx';
import {spy, stub} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { browserHistory } from 'react-router';
import { shallow, mount, render } from 'enzyme';

describe('<App />', () => {
  it('appends a app to the document body', () => {
    let app = TestUtils.renderIntoDocument(<App />);
    expect(App).toExist();
  });
  it('renders app', () => {
    let wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    let wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  it('calls componentWillReceiveProps', () => {
    spy(App.prototype, 'componentWillReceiveProps');
    let wrapper = mount(<App />);
    wrapper.setProps({name: 'Neinei'});
    expect(App.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
    App.prototype.componentWillReceiveProps.restore();
    wrapper.unmount();
  });

  it('renders a div', () => {
    let wrapper = mount(<App />);
    expect(wrapper.find('div').length).toBeGreaterThan(1);
    wrapper.unmount();
  });

  it('Test onSession - valid state', () => {
    let wrapper = shallow(<App />);
    let instance = wrapper.instance();
    expect(instance instanceof App).toBe(true);
    spy(instance, 'onSession');
    let state = {
      user: 'store changed',
      error: null
    };
    instance.onSession(state);
    expect(wrapper.state().isLoggedIn).toBe(true);
    instance.onSession.restore();
  });

  it('Test onSession - invalid state', () => {
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'onSession');
    let state = {
      user: null,
      error: 'token not valid'
    };
    instance.onSession(state);
    expect(wrapper.state().isLoggedIn).toBe(false);
    instance.onSession.restore();
  });

  it('Test handleLogout', () => {
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'handleLogout');
    instance.handleLogout();
    expect(wrapper.state().isLoggedIn).toBe(false);
    instance.handleLogout.restore();
  });

  it('Test onLogout', () => {
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'onLogout');
    spy(browserHistory, 'push');
    let state = {
      success: true,
      error: null
    };
    instance.onLogout(state);
    expect(wrapper.state().isLoggedIn).toBe(false);
    expect(browserHistory.push.called).toBe(true);
    instance.onLogout.restore();
    browserHistory.push.restore();
  });

  it('Test refresh', () => {
    //expect(Object.getOwnPropertyNames(instance)).toBe(false);
    stub(window.location, 'reload').returns(true);
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'refresh');
    instance.refresh();
    expect(wrapper.state().isLoggedIn).toBe(false);
    expect(window.location.reload.called).toBe(true);
    instance.refresh.restore();
    window.location.reload.restore();
  });

  it('Test handleSnackbar', () => {
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'handleSnackBar');
    instance.handleSnackBar('abcd');
    expect(wrapper.state().opensnackbar).toBe(true);
    expect(wrapper.state().snackbarmsg).toBe('abcd');
    instance.handleSnackBar.restore();
  });

  it('Test handleToggle', () => {
    let wrapper = mount(<App />);
    let instance = wrapper.instance();
    spy(instance, 'handleToggle');
    instance.handleToggle();
    expect(typeof wrapper.state().open).toBe('boolean');
    instance.handleToggle.restore();
  });

});
