import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Login from '../Login.jsx';
import loginActions from '../../../actions/LoginActions';
import LoginStore from '../../../stores/LoginStore';

describe('<Login />', () => {
  describe('Login rendering', () => {

    it('renders component without problems', () => {
      let login = TestUtils.renderIntoDocument(<Login/>);
      expect(login).toExist();
    });

    it('calls componentDidMount once', () => {
      spy(Login.prototype, 'componentDidMount');
      mount(<Login />);
      expect(Login.prototype.componentDidMount.called).toBe(true);
    });

    it('sets initial state', () => {
      const wrapper = mount(<Login />);
      wrapper.setState({error: false, canSubmit: false});
      expect(wrapper.state().error).toEqual(false);
      expect(wrapper.state().canSubmit).toEqual(false);
    });

    it('sets initial props', () => {
      const wrapper = mount(<Login />);
      wrapper.setState({error: false, canSubmit: false});
      expect(wrapper.state().error).toEqual(false);
      expect(wrapper.state().canSubmit).toEqual(false);
      wrapper.unmount();
    });
  });

  describe('Suite to test functions', () => {

    it('tests handlelogin', () => {
      spy(loginActions, 'loginUser');
      let data = {username: 'mark', password: 'abc123'};
      const wrapper = mount(<Login open={true}/>);
      const inst = wrapper.instance();
      // spy on login functions
      spy(inst, 'handleLogin');
      // form submission
      inst.handleLogin(data);
      expect(loginActions.loginUser.called).toBe(false);
      inst.handleLogin.restore();
      wrapper.unmount();
    });

    it('Test onChange - valid state', () => {
      let snackbar = spy();
      let onClick = spy();
      let wrapper = mount(<Login open={true} snackbar={snackbar} onClick={onClick}/>);
      const instance = wrapper.instance();
      spy(instance, 'onChange');
      let state = {
        message: {success: true}
      };
      instance.onChange(state);
      expect(wrapper.state().error).toBe(false);
      instance.onChange.restore();
    });

    it('Test enableButton()', () => {
      let wrapper = mount(<Login open={true}/>);
      const instance = wrapper.instance();
      spy(instance, 'enableButton');
      instance.enableButton();
      expect(wrapper.state().canSubmit).toBe(true);
      instance.enableButton.restore();
    });

    it('Test disableButton()', () => {
      let wrapper = mount(<Login open={true}/>);
      const instance = wrapper.instance();
      spy(instance, 'disableButton');
      instance.disableButton();
      expect(wrapper.state().canSubmit).toBe(false);
      instance.disableButton.restore();
    });
  });

});
