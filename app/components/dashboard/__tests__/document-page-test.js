import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentPage from '../document-page.jsx';

describe('<DocumentPage />', () => {
  it('expects component to render', ()  => {
    let doc = {
      ownerId: {
        _id: 23
      }
    };
    let wrapper = mount(<DocumentPage params={{id:21}} />);
    expect(wrapper).toExist();
    console.log(wrapper.debug());
    wrapper.unmount();
  });

  it('Test handleRequestClose', () => {
    let wrapper = mount(<DocumentPage params={{_id: 21}} />);
    const instance = wrapper.instance();
    console.log('NavBar',wrapper.debug());
    spy(instance, 'handleRequestClose');
    instance.handleRequestClose();
    expect(wrapper.state().snackopen).toBe(false);
    instance.handleRequestClose.restore();
    wrapper.unmount();
  });

  it('Test handleOpen', () => {
    let wrapper = shallow(<DocumentPage params={{_id: 21}} />);
    const instance = wrapper.instance();
    spy(instance, 'handleOpen');
    instance.handleOpen();
    expect(wrapper.state().open).toBe(true);
    instance.handleOpen.restore();
  });

  it('Test handleClose', () => {
    let wrapper = shallow(<DocumentPage params={{_id: 21}} />);
    const instance = wrapper.instance();
    spy(instance, 'handleClose');
    instance.handleClose();
    expect(wrapper.state().open).toBe(false);
    instance.handleClose.restore();
  });

});
