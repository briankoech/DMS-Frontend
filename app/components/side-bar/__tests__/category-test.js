import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Category from '../Category.jsx';

describe('<Category />', () => {
  it('renders component', () => {
    let closeNav = spy();
    let wrapper = mount(<Category title='Music' closeNav={closeNav}/>);
    let instance = wrapper.instance();
    instance.handleClick();
    expect(wrapper).toExist();
  });
});
