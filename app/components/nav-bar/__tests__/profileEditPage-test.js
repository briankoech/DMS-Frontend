import React from 'react';
import ProfileEdit from '../ProfileEditPage.jsx';
import {spy, stub} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

describe('<ProfileEdit />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    let onClick = spy();
    let openprofile = spy();
    wrapper = mount(<ProfileEdit onClick={{onClick}} openprofile={{}}/>);
    instance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders profile edit dialog', () => {
    const testClass = 'test-dialog-class';
    expect(wrapper).toExist();
  });

  it('renders the dialog to DOM', () => {
    spy(ProfileEdit.prototype, 'componentDidMount');
    ProfileEdit.prototype.componentDidMount.restore();
  });

  it('calls componentWillUnmount', () => {
    spy(ProfileEdit.prototype, 'componentWillUnmount');
    wrapper.unmount();
    expect(ProfileEdit.prototype.componentWillUnmount.calledOnce).toBe(true);
    ProfileEdit.prototype.componentWillUnmount.restore();
  });

  it('calls  handleUpdateUser', () => {
    spy(instance, 'handleUpdateUser');
    let model = {username: 'Brian'};
    instance.handleUpdateUser(model);
    expect(wrapper.state().model).toBe(model);
    instance.handleUpdateUser.restore();
  });

  it('Test enableButton', () => {
    spy(instance, 'enableButton');
    instance.enableButton();
    expect(wrapper.state().canSubmit).toBe(true);
    instance.enableButton.restore();
  });

  it('Test disableButton', () => {
    spy(instance, 'disableButton');
    instance.disableButton();
    expect(wrapper.state().canSubmit).toBe(false);
    instance.disableButton.restore();
  });

  it('Test onChange', () => {
    spy(instance, 'onChange');
    let state = {
      user: {
        _id: 1,
        name: {first: 'kim', last: 'andela'},
        email: 'abc@yahoo.col-md-12'
      }
    };
    instance.onChange(state);
    expect(wrapper.state().userId).toEqual(1);
    instance.onChange.restore();
  });
});
