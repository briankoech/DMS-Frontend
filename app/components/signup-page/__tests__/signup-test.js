import React from 'react';
import SignupDialog from '../Signup.jsx';
import {spy, stub} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

describe('<SignupDialog />', () => {
  it('appends a dialog to the document body', () => {
    const testClass = 'test-dialog-class';
    let signup = TestUtils.renderIntoDocument(<SignupDialog />);
    expect(signup).toExist();
  });

  it('appends a dialog to the body', () => {
    spy(SignupDialog.prototype, 'componentDidMount');
    let wrapper = mount(<SignupDialog open={true} />);
    SignupDialog.prototype.componentDidMount.restore();
    wrapper.unmount();
  });

  it('calls componentWillUnmount', () => {
    spy(SignupDialog.prototype, 'componentWillUnmount');
    let wrapper = mount(<SignupDialog open={true} />);
    wrapper.unmount();
    expect(SignupDialog.prototype.componentWillUnmount.calledOnce).toBe(true);
    SignupDialog.prototype.componentWillUnmount.restore();
  });

  it('handle Create user', () => {
    let wrapper = mount(<SignupDialog open={true}/>);
    let resetForm = spy();
    const instance = wrapper.instance();
    spy(instance, 'handleCreateUser');
    let model = {username: 'Brian'};
    instance.handleCreateUser(model, resetForm);
    expect(wrapper.state().model).toBe(model);
    instance.handleCreateUser.restore();
  });

  it('Test enableButton', () => {
    let wrapper = mount(<SignupDialog open={true}/>);
    const instance = wrapper.instance();
    spy(instance, 'enableButton');
    instance.enableButton();
    expect(wrapper.state().canSubmit).toBe(true);
    instance.enableButton.restore();
  });

  it('Test disableButton', () => {
    let wrapper = mount(<SignupDialog open={true}/>);
    const instance = wrapper.instance();
    spy(instance, 'disableButton');
    instance.disableButton();
    expect(wrapper.state().canSubmit).toBe(false);
    instance.disableButton.restore();
  });

  it('Test onChange', () => {
    let onClick = spy();
    let wrapper = mount(<SignupDialog open={true} onClick={onClick}/>);
    const instance = wrapper.instance();
    spy(instance, 'onChange');
    let state = {message: 'store changed'};
    instance.onChange(state);
    expect(wrapper.state().success).toBe(true);
    instance.onChange.restore();
  });
});
