import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import App from '../app.jsx';
import Login from '../../login-page/login.jsx';

describe('<App />', () => {
  describe('renders the component', () => {
    it('renders app', () => {
      const wrapper = render(<App />);
      console.log('WRAPPER', wrapper);
      //expect(wrapper.find('div').length).toEqual(1);
    });
    it('calls componentDidMount', () => {
      sinon.spy(App.prototype, 'componentDidMount');
      const wrapper = mount(<App />);
      expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
    });

    it('renders a div', () => {
      const wrapper = shallow(<App className="app"/>);
      expect(wrapper.is('.app')).toEqual(true);
    });

  });

  describe('test functions', () => {

  });
});
