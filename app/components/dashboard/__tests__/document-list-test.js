import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentList from '../document-list.jsx';

describe('<DocumentPage />', () => {
  describe('Test ', () => {
    it('expects component to render', ()  => {
      let wrapper = mount(<DocumentList params={{id: ''}} location={{pathname: '/'}}/>);
      console.log('DOCUMENTLIST',wrapper.debug());
      expect(wrapper).toExist();
    });
  });
});
