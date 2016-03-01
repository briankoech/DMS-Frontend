import React from 'react';
import ProfileEdit from '../ProfileEdit-page.jsx';
import {spy, stub} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

describe('<ProfileEdit />', () => {
  it('renders profile edit dialog', () => {
    const testClass = 'test-dialog-class';
    let profile = TestUtils.renderIntoDocument(<ProfileEdit />);
    expect(profile).toExist();
  });

  it('renders the dialog to DOM', () => {
    spy(ProfileEdit.prototype, 'componentDidMount');
    let wrapper = mount(<ProfileEdit open={true} />);
    ProfileEdit.prototype.componentDidMount.restore();
    wrapper.unmount();
  });

  it('calls componentWillUnmount', () => {
    spy(ProfileEdit.prototype, 'componentWillUnmount');
    let wrapper = mount(<ProfileEdit open={true} />);
    wrapper.unmount();
    expect(ProfileEdit.prototype.componentWillUnmount.calledOnce).toBe(true);
    ProfileEdit.prototype.componentWillUnmount.restore();
  });

  it('calls  handleUpdateUser', () => {
    let wrapper = mount(<ProfileEdit open={true}/>);
    const instance = wrapper.instance();
    spy(instance, 'handleUpdateUser');
    let model = {username: 'Brian'};
    instance.handleUpdateUser(model);
    expect(wrapper.state().model).toBe(model);
    instance.handleUpdateUser.restore();
  });

  it('Test enableButton', () => {
    let wrapper = mount(<ProfileEdit open={true}/>);
    const instance = wrapper.instance();
    spy(instance, 'enableButton');
    instance.enableButton();
    expect(wrapper.state().canSubmit).toBe(true);
    instance.enableButton.restore();
  });

  it('Test disableButton', () => {
    let wrapper = mount(<ProfileEdit open={true}/>);
    const instance = wrapper.instance();
    spy(instance, 'disableButton');
    instance.disableButton();
    expect(wrapper.state().canSubmit).toBe(false);
    instance.disableButton.restore();
  });

  it('Test onChange', () => {
    let wrapper = mount(<ProfileEdit open={true}/>);
    const instance = wrapper.instance();
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

  it('Test onUpdate', () => {
    let snackbar = spy();
    let onClick = spy();

    let wrapper = mount(<ProfileEdit open={true} onClick={onClick} snackbar={snackbar} />);
    const instance = wrapper.instance();
    spy(instance, 'onUpdate');
    let state = {
      user: {
        _id: 1,
        name: {first: 'kim', last: 'andela'},
        email: 'abc@yahoo.col-md-12'
      }
    };
    instance.onUpdate(state);
    expect(instance.onUpdate.called).toBe(true);
    instance.onUpdate.restore();
  });
});
