import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import DocumentPage from '../document-page.jsx';

describe('<DocumentPage />', () => {
  describe('Test component rendering', () => {
    it('expects component to render', ()  => {
      let wrapper = mount(<DocumentPage />);
      console.log('DOCUMENT PAGE',wrapper.debug());
      expect(wrapper).toExist();
    });
  });
});
