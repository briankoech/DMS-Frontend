import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import App from '../app.jsx';
import Login from '../../login-page/login.jsx';

describe('<App />', () => {
  describe('renders the component', () => {
    it('renders app', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toExist();
    });
    it('calls componentDidMount', () => {
      sinon.spy(App.prototype, 'componentDidMount');
      const wrapper = mount(<App />);
      expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
    });

    it('calls componentWillReceiveProps', () => {
      sinon.spy(App.prototype, 'componentWillReceiveProps');
      const wrapper = mount(<App />);
      wrapper.setProps({name: 'Neinei'});
      expect(App.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
    });

    it('renders a div', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find('div').length).toBeGreaterThan(1);
    });

  });

  describe('test functions', () => {
    console.log(App.prototype);
  });
});
