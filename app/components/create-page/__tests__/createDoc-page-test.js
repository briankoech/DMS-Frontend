import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import CreateDocPage from '../CreateDoc-page.jsx';

describe('<CreateDoc />', () => {
  describe('test suite for rendering on \'/create\' url ', () => {
    it('renders component', () => {
      let wrapper = mount(<CreateDocPage location={{ pathname: "/"}}/>);
      expect(wrapper).toExist();
    });

    it('it has divs and form as parent and children', () => {
      const wrapper = shallow(<CreateDocPage location="/"/>);
      expect(wrapper.find('.editor').length).toBe(1);
      expect(wrapper.find('div').children().length).toEqual(4);
    });

  });
  describe('test suite for rendering on \'/edit\' url ', () => {
    it('renders component', () => {
      let wrapper = shallow(<CreateDocPage location={{ pathname: "/edit?document=xyz"}}/>);
      expect(wrapper).toExist();
    });
  });

  describe('test for react lifecycle functions', () => {
    it('calls componentDidMount', () => {
      sinon.spy(CreateDocPage.prototype, 'componentDidMount');
      mount(<CreateDocPage  location="/"/>);
      expect(CreateDocPage.prototype.componentDidMount.calledOnce).toBe(true);
    });
    it('has initial state', () => {
      const wrapper = mount(<CreateDocPage location="/"/>);
      wrapper.setState({title: 'TIA', content: 'Get away'})
      expect(wrapper.state('title')).toBe('TIA');
      expect(wrapper.state('content')).toMatch(/Get away/);
    });
  });

  describe('class functions test', () => {
    it('expect onSubmit to be called', () => {

    });
  });
});
