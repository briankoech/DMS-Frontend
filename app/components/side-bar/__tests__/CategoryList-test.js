import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import CategoryList from '../CategoryList.jsx';

describe('<Categorylist />', () => {
  it('renders component', () => {
    let wrapper = mount(<CategoryList />);
  });
});
