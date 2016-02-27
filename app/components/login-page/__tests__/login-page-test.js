import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Login from '../login.jsx';
import loginActions from '../../../actions/loginActions';
import LoginStore from '../../../stores/LoginStore';

describe('<Login />', () => {
  describe('Login rendering', () => {

    it('renders component without problems', () => {
      let login = TestUtils.renderIntoDocument(<Login/>);
      expect(login).toExist();
    });

    it('calls componentDidMount once', () => {
      sinon.spy(Login.prototype, 'componentDidMount');
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
    });

    it('simulate componentWillReceiveProps', () => {
      const spy = sinon.spy(Login.prototype, 'componentWillReceiveProps');
      const wrapper = mount(<Login />);
      expect(spy.calledOnce).toEqual(false);
      wrapper.setProps({openLogin: true});
      expect(spy.calledOnce).toEqual(true);
    });

    it('children have nodes', () => {
      const wrapper = render(<Login />);
      expect(wrapper.find('.login').length).toEqual(0);
      expect(wrapper.text()).toContain('save stories');
    });

    it('receives the correct props', () => {
      const openLogin = sinon.spy();
      const login = shallow(<Login openLogin={openLogin} />);
      expect(typeof login.props.openLogin).toBe('function');
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(Login.prototype, 'componentWillUnmount');
      let login = mount(<Login />);
      login.unmount();
      expect(Login.prototype.componentWillUnmount.calledOnce).toBe(true);
    });

    it('works ', () => {

    });
  });

  describe('Suite to test functions', () => {

    it('calls onChange when stores receive data', () => {
      sinon.spy(Login.prototype, 'componentWillMount');
      mount(<Login />);
      expect(Login.prototype.componentWillMount.calledOnce).toBe(true);
    });

    it('simulate login form submission', () => {
      const onSubmit = sinon.spy();
      const wrapper = mount(<Login />)
      sinon.spy(instance, 'handleLogin');
      login.find('form').simulate('submit')
    });
    it('simulates login', () => {
      sinon.stub(loginActions, 'loginSuccess').return({success: true});
      let wrapper = mount(<Login />);
      const inst = wrapper.instance();
      sinon.spy(inst, 'handleLogin');
      login.find('form').simulate('submit', handleLogin);
      expect(inst instanceof Login).toBe(true);
      expect(inst.handleLogin.calledOnce).toBe(true);
      inst.handleLogin.restore();
      loginActions.loginSuccess.restore();
    })

  });

});