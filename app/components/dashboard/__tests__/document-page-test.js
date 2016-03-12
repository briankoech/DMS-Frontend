import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentPage from '../Document-page.jsx';
import DocumentActions from '../../../actions/DocumentActions';
import { browserHistory } from 'react-router';

describe('<DocumentPage />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    stub(localStorage, 'getItem').returns(true);
    wrapper = mount(<DocumentPage params={{id:21}} />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    localStorage.getItem.restore();
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
    spy(instance, 'handleRequestClose');
    instance.handleRequestClose();
    expect(wrapper.state().snackopen).toBe(false);
    instance.handleRequestClose.restore();
  });

  it('Test handleOpen', () => {
    spy(instance, 'handleOpen');
    instance.handleOpen();
    expect(wrapper.state().open).toBe(true);
    instance.handleOpen.restore();
  });

  it('Test handleClose', () => {
    spy(instance, 'handleClose');
    instance.handleClose();
    expect(wrapper.state().open).toBe(false);
    instance.handleClose.restore();
  });

  it('Test onSession - valid', () => {
    stub(DocumentActions, 'getDocument').returns(true);
    spy(DocumentActions, 'getDocumentSuccess');
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

  it('Test onChange - success', () => {
    stub(browserHistory, 'push').returns(true);
    spy(instance, 'onChange');
    let state = {
      user: null,
      message: 'delete successfuly'
    }
    instance.onChange(state);
    expect(browserHistory.push.called).toBe(true);
    instance.onChange.restore();
    browserHistory.push.restore();
  });

  it('Test onChange -- error', () => {
    spy(instance, 'onChange');
    let state = {
      doc: {
        data: {
          _id: 32,
          ownerId: {
            _id: 1,
            name: {first: 'kodk', last: 'jdjsnj'}
          },
          category: {_id: 31, category: 'dbj'},
          contributors: [123, 42]
        }
      }
    }
    instance.onChange(state);
    expect(wrapper.state('docId')).toBe(32);
    instance.onChange.restore();
  });

  it('expects component to render without token', ()  => {
    wrapper.unmount();
    localStorage.getItem.restore();
    stub(localStorage, 'getItem').returns(false);
    wrapper = mount(<DocumentPage params={{id:21}} />);
    let doc = {
      ownerId: {
        _id: 23
      }
    };
    expect(wrapper).toExist();
  });

});
