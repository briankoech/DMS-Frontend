import React from 'react';
import SignupDialog from '../signup.jsx';
import {spy, stub} from 'sinon';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

describe('<SignupDialog />', () => {
  it('appends a dialog to the document body', () => {
    const testClass = 'test-dialog-class';
    let wrapper = shallow(
      <SignupDialog
        open={true}
        contentClassName={testClass}
      />
    );
    expect(wrapper).toExists();
  });

  it('appennds a dialog to the body', () => {
    let wrapper = mount(<SignupDialog open={true} />);
    console.log(wrapper.debug());
  });

  it('registers events on dialog actions', () => {
    const clickSpy = spy();
    const testClass = 'dialog-action';

    let wrapper = mount(
      <SignupDialog
        open={true}
        actions={[
          <button
            key="a"
            onClick={clickSpy}
            className={testClass}
          >
            test
          </button>
        ]}
      />
    );
    console.log(wrapper.debug());
    expect(wrapper.find(testClass).length).toBe(0);
    wrapper.find('button').simulate('click');
    TestUtils.Simulate.click(actionEl);
    expect(clickSpy.called).toBe(true);
  });
});
