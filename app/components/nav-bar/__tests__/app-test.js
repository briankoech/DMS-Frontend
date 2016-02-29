import React from 'react';
import App from '../app.jsx';
import {spy} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
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
    let wrapper = mount(<App open={true}/>);
    let instance = wrapper.instance();
    console.log('APPPPP',instance);
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
});
