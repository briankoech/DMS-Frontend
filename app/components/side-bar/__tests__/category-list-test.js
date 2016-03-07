import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import CategoryList from '../Category-list.jsx';
import CategoryActions from '../../../actions/CategoryActions';

describe('<Categorylist />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = mount(<CategoryList />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders component', () => {
    expect(wrapper).toExist();
  });

  it('calls handleCreateCategory', () => {
    stub(CategoryActions, 'addCategory').returns(true);
    stub(CategoryActions, 'fetchCategory').returns(true);
    spy(instance, 'handleCreateCategory');
    let resetForm = spy();
    instance.handleCreateCategory('abc', resetForm);
    expect(CategoryActions.fetchCategory.called).toBe(true);
    CategoryActions.addCategory.restore();
    CategoryActions.fetchCategory.restore();
    instance.handleCreateCategory.restore();
  });

  it('calls enableButton', () => {
    spy(instance, 'enableButton');
    instance.enableButton();
    expect(wrapper.state('canSubmit')).toBe(true);
    instance.enableButton.restore();
  });

  it('calls disableButton', () => {
    spy(instance, 'disableButton');
    instance.disableButton();
    expect(wrapper.state('canSubmit')).toBe(false);
    instance.disableButton.restore();
  });


});
