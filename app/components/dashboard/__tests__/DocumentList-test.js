import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {spy, stub} from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentList from '../DocumentList.jsx';
import Actions from '../../../actions/DocumentActions';
import SessionActions from '../../../actions/SessionActions';

describe('<DocumentList />', () => {
  describe('Test ', () => {
    it('expects component to render', ()  => {
      let wrapper = mount(<DocumentList params={{id: 4}} location={{pathname: '/'}}/>);
      expect(wrapper).toExist();
    });

    it('calls componentWillMount', () => {
      let token = 'jndjs';
      let docs = [{
        _id: 3,
        title: 'Karma is a test-runner',
        content: 'TIA',
        createdAt: '2016-02-15T15:10:34.000Z',
        ownerId: {
          _id: 53,
          name: {
            first: 'Mercy',
            last: 'Mkenya'
          }
        },
        category: {
          _id: 10,
          category: 'music'
        }
      }];

      spy(DocumentList.prototype, 'componentWillMount');
      let wrapper = mount(<DocumentList document={{docs}} params={{id: 3}} location={{pathname: '/'}}/>);
      wrapper.setState({documents: docs});
      expect(DocumentList.prototype.componentWillMount.calledOnce).toBe(true);
      expect(wrapper.state('documents').length).toEqual(1);
      DocumentList.prototype.componentWillMount.restore();
      wrapper.unmount();
    });

    it('calls componentDidMount on \'/ ', () => {
      stub(Actions, 'fetchDocuments').returns(true);
      spy(DocumentList.prototype, 'componentDidMount');
      let wrapper = mount(<DocumentList params={{id: 3}} location={{pathname: '/'}}/>);
      expect(DocumentList.prototype.componentDidMount.calledOnce).toBe(true);
      expect(Actions.fetchDocuments.called).toBe(true);
      DocumentList.prototype.componentDidMount.restore();
      wrapper.unmount();
      Actions.fetchDocuments.restore();
    });

    it('calls componentDidMount on \'/category ', () => {
      stub(Actions, 'fetchByCategory').returns(true);
      spy(DocumentList.prototype, 'componentDidMount');
      let wrapper = mount(<DocumentList params={{id: 3}} location={{pathname: '/category', query: {category: 'music'}}}/>);
      expect(DocumentList.prototype.componentDidMount.calledOnce).toBe(true);
      expect(Actions.fetchByCategory.called).toBe(true);
      DocumentList.prototype.componentDidMount.restore();
      wrapper.unmount();
      Actions.fetchByCategory.restore();
    });

    it('calls componentDidMount on \'/author ', () => {
      stub(Actions, 'fetchDocumentsByUser').returns(true);
      spy(DocumentList.prototype, 'componentDidMount');
      let wrapper = mount(<DocumentList params={{id: 3}} location={{pathname: '/author', query: {user: 'hdbh'}}}/>);
      expect(DocumentList.prototype.componentDidMount.calledOnce).toBe(true);
      expect(Actions.fetchDocumentsByUser.called).toBe(true);
      DocumentList.prototype.componentDidMount.restore();
      wrapper.unmount();
      Actions.fetchDocumentsByUser.restore();
    });

    it('Test onSession - valid on url /', () => {
      stub(Actions, 'fetchDocuments').returns(true);
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/'}}/>);
      const instance = wrapper.instance();
      spy(instance, 'onSession');
      let state = {
        state: {
          _id: 1,
          name: {first: 'kim', last: 'andela'},
          email: 'abc@yahoo.col-md-12'
        },
        error: null
      };
      instance.onSession(state);
      expect(Actions.fetchDocuments.called).toBe(true);
      instance.onSession.restore();
      Actions.fetchDocuments.restore();
    });

    it('Test onSession - valid url \'/category ', () => {
      stub(Actions, 'fetchByCategory').returns(true);
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/category', query: {category: 'music'}}}/>);
      const instance = wrapper.instance();
      spy(instance, 'onSession');
      let state = {
        user: {
          _id: 1,
          name: {first: 'kim', last: 'andela'},
          email: 'abc@yahoo.col-md-12'
        },
        error: null
      };
      instance.onSession(state);
      expect(Actions.fetchByCategory.called).toBe(true);
      instance.onSession.restore();
      Actions.fetchByCategory.restore(true);
    });

    it('Test onSession - valid url \' /author', () => {
      spy(Actions, 'fetchDocumentsByUser');
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/author', query: {user: 'martin'}}}/>);
      const instance = wrapper.instance();
      spy(instance, 'onSession');
      let state = {
        user: {
          _id: 1,
          name: {first: 'kim', last: 'andela'},
          email: 'abc@yahoo.col-md-12'
        },
        error: null
      };
      instance.onSession(state);
      expect(Actions.fetchDocumentsByUser.called).toEqual(true);
      instance.onSession.restore();
      Actions.fetchDocumentsByUser.restore();
    });

    it('Test onSession - invalid state', () => {
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/'}}/>);
      const instance = wrapper.instance();
      spy(instance, 'onSession');
      let state = {
        user: '',
        error: 'error'
      };
      instance.onSession(state);
      expect(wrapper.state().isLoggedIn).toEqual(false);
      instance.onSession.restore();
    });

    it('Test handleOpen', () => {
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/'}}/>);
      const instance = wrapper.instance();
      spy(instance, 'handleOpen');
      instance.handleOpen();
      expect(wrapper.state().open).toBe(true);
      instance.handleOpen.restore();
    });

    it('Test handleClose', () => {
      let wrapper = mount(<DocumentList params={{id: 2}} location={{pathname: '/'}}/>);
      const instance = wrapper.instance();
      spy(instance, 'handleClose');
      instance.handleClose();
      expect(wrapper.state().open).toBe(false);
      instance.handleClose.restore();
    });
  });
});
