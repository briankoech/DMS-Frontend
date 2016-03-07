import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentPage from '../Document-page.jsx';
import DocumentActions from '../../../actions/DocumentActions';

describe('<DocumentPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<DocumentPage params={{id:21}} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('expects component to render', ()  => {
    let doc = {
      ownerId: {
        _id: 23
      }
    };
    expect(wrapper).toExist();
  });

  it('Test handleRequestClose', () => {
    const instance = wrapper.instance();
    spy(instance, 'handleRequestClose');
    instance.handleRequestClose();
    expect(wrapper.state().snackopen).toBe(false);
    instance.handleRequestClose.restore();
    wrapper.unmount();
  });

  it('Test handleOpen', () => {
    const instance = wrapper.instance();
    spy(instance, 'handleOpen');
    instance.handleOpen();
    expect(wrapper.state().open).toBe(true);
    instance.handleOpen.restore();
  });

  it('Test handleClose', () => {
    const instance = wrapper.instance();
    spy(instance, 'handleClose');
    instance.handleClose();
    expect(wrapper.state().open).toBe(false);
    instance.handleClose.restore();
  });

  it('Test onSession - valid', () => {
    stub(DocumentActions, 'getDocument').returns(true);
    spy(DocumentActions, 'getDocumentSuccess');
    const instance = wrapper.instance();
    spy(instance, 'onSession');
    let state = {
      user: {
        role: {
          title: 'admin'
        }
      },
      error: null
    }
    instance.onSession(state);
    expect(wrapper.state().open).toBe(false);
    expect(DocumentActions.getDocument.called).toBe(true);
    instance.onSession.restore();
    DocumentActions.getDocument.restore();
    DocumentActions.getDocumentSuccess.restore();
  });

  it('Test onSession - invalid', () => {
    stub(DocumentActions, 'getDocument').returns(true);
    const instance = wrapper.instance();
    spy(instance, 'onSession');
    let state = {
      user: null,
      error: 'error'
    }
    instance.onSession(state);
    expect(wrapper.state().open).toBe(false);
    instance.onSession.restore();
    expect(DocumentActions.getDocument.called).toBe(true);
    DocumentActions.getDocument.restore();
  });

  it('Test handleDelete', () => {
    stub(DocumentActions, 'deleteDocument').returns(true);
    const instance = wrapper.instance();
    spy(instance, 'handleDelete');
    let state = {
      user: null,
      error: 'error'
    }
    instance.handleDelete(state);
    expect(wrapper.state().open).toBe(false);
    instance.handleDelete.restore();
    expect(DocumentActions.deleteDocument.called).toBe(true);
    expect(wrapper.state('snackopen')).toBe(true);
    DocumentActions.deleteDocument.restore();
  });

});
