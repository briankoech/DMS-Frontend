import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Document from '../document.jsx';

describe('<Document />', () => {
  let doc, user;
  beforeEach(() => {
    doc = {
      __v: 0,
      _id: "56cf6b1357454eab19c455fd",
      accessLevel: 1,
      category: {
        _id: '56cf184144e81e290fe00cf4',
        category: 'business'
      },
      content: 'hbdj kdsh',
      createdAt: '2016-02-25T20:58:59.309Z',
      ownerId: {_id: '364642t6trt'},
      title: "What a Game"
    };

    user = {_id: '364642t6trt' };

  });

  it('renders the component', () => {
    let wrapper = mount(<Document document={doc} user={user}/>);
    expect(wrapper).toExist();
    wrapper.unmount();
  });

  it('calls componentDidMount', () => {
    sinon.spy(Document.prototype, 'componentDidMount');
    let wrapper = mount(<Document document={doc} user={user}/>);
    expect(Document.prototype.componentDidMount.called).toBe(true);
    wrapper.unmount();
  });

  it('renders component children', () => {
    let wrapper = mount(<Document document={doc} user={user}/>);
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('div').length).toBeGreaterThan(3);
    expect(wrapper.find('.row').length).toEqual(2);
    wrapper.unmount();
  });

  it('calls componentWillUnmount', () => {
    sinon.stub(Document.prototype, 'componentWillUnmount');
    let wrapper = mount(<Document document={doc} user={user}/>);
    wrapper.unmount();
    expect(Document.prototype.componentWillUnmount.called).toBe(true);
  });
});
