import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Main from '../main.jsx';


describe('<Main />', () => {
  it('renders <Main />', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toExist();
  });

  it('returns divs with classes', () => {
    const wrapper = mount(<Main />);
    expect(wrapper.find('.spacer').length).toEqual(1);
    expect(wrapper.find('.container').length).toEqual(2);
    expect(wrapper.find('.content').length).toEqual(1);
  });

  it('returns several divs', () => {
    const wrapper = mount(<Main />);
    expect(wrapper.find('div').length).toBeGreaterThan(5);
  });

  it('container has a parent', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find('.spacer').parent().is('div')).toBe(true);
  });

  it('returns an instance of Main', () => {
    const wrapper = mount(<Main />);
    const inst = wrapper.instance();
    expect(inst instanceof Main).toBe(true);
  });
});
