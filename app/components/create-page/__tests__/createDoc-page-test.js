import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentActions from '../../../actions/documentActions';
import CreateDocPage from '../CreateDoc-page.jsx';

describe('<CreateDoc />', () => {
  describe('test suite for rendering on \'/create\' url ', () => {
    it('renders component', () => {
      let wrapper = mount(<CreateDocPage location={{ pathname: "/"}}/>);
      expect(wrapper).toExist();
    });

    it('it has divs and form as parent and children', () => {
      const wrapper = shallow(<CreateDocPage location="/"/>);
      expect(wrapper.find('.editor').length).toBe(1);
      expect(wrapper.find('div').children().length).toEqual(4);
    });

  });
  describe('test suite for rendering on \'/edit\' url ', () => {
    it('renders component', () => {
      let wrapper = shallow(<CreateDocPage location={{ pathname: "/edit?document=xyz"}}/>);
      expect(wrapper).toExist();
    });
  });

  describe('test for react lifecycle functions', () => {
    it('calls componentDidMount', () => {
      sinon.spy(CreateDocPage.prototype, 'componentDidMount');
      mount(<CreateDocPage  location="/edit?document=dhhuwfgg"/>);
      expect(CreateDocPage.prototype.componentDidMount.calledOnce).toBe(true);
    });
    it('has initial state', () => {
      const wrapper = mount(<CreateDocPage location="/"/>);
      wrapper.setState({title: 'TIA', content: 'Get away'})
      expect(wrapper.state('title')).toBe('TIA');
      expect(wrapper.state('content')).toMatch(/Get away/);
    });
  });

  describe('class functions test', () => {
    it('Test create onSubmit function', () => {
      sinon.stub(DocumentActions, 'updateDocuments').returns(true);
      let wrapper = mount(<CreateDocPage location="/create"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'onSubmit');
      let model = {
        title: 'ABC',
        content: 'Good times'
      };
      instance.onSubmit(model);
      expect(instance.onSubmit.calledOnce).toBe(true);
      //expect(DocumentActions.updateDocuments.called).toBe(true);
      instance.onSubmit.restore();
      DocumentActions.updateDocuments.restore();
      wrapper.mount();
    });

    it('Test edit onSubmit function', () => {
      sinon.stub(DocumentActions, 'createDocument').returns(true);
      let wrapper = mount(<CreateDocPage location="/edit?document=31t3gy3"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'onSubmit');
      let model = {
        title: 'ABC',
        content: 'Good times'
      };
      instance.onSubmit(model);
      expect(instance.onSubmit.calledOnce).toBe(true);
      //expect(DocumentActions.createDocument.called).toBe(true);
      instance.onSubmit.restore();
      DocumentActions.createDocument.restore();
      wrapper.mount();
    });

    it('Test edit handleSelectField function', () => {
      let wrapper = mount(<CreateDocPage location="/edit?document=31t3gy3"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'handleSelectField');
      let model = {
        title: 'ABC',
        content: 'Good times'
      };
      let testvalue = 12;
      instance.handleSelectField(null, null, testvalue);
      expect(wrapper.state('accessLevel')).toBe(testvalue);
      instance.handleSelectField.restore();
      wrapper.mount();
    });

    it('Test edit enableButton function', () => {
      let wrapper = mount(<CreateDocPage location="/edit?document=31t3gy3"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'enableButton');
      instance.enableButton();
      expect(wrapper.state('canSubmit')).toBe(true);
      instance.enableButton.restore();
      wrapper.mount();
    });

    it('Test edit handleRequestClose function', () => {
      let wrapper = mount(<CreateDocPage location="/edit?document=31t3gy3"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'handleRequestClose');
      instance.handleRequestClose();
      expect(wrapper.state('open')).toBe(false);
      instance.handleRequestClose.restore();
      wrapper.mount();
    });

    it('Test edit onChange function', () => {
      let wrapper = mount(<CreateDocPage location="/"/>);
      const instance = wrapper.instance();
      sinon.spy(instance, 'onChange');
      let state = {
        documents: {
          title: 'this one',
          doc: {_id: 1},
          data: {
            title:'abc',
            category: {category: 'music'}
          }
        }
      };
      instance.onChange(state);
      expect(instance.onChange.calledOnce).toBe(true);
      instance.onChange.restore();
      wrapper.mount();
    });
  });
});
