import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import DocumentActions from '../../actions/documentActions';
import DocumentStore from '../DocumentStore.js';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Document Store tests', () => {
  it('listens for updateDocuments Actions', () => {
    sinon.stub(DocumentActions, 'updateDocuments').returns(true);
    let data = {
      ownerId : {_id: 12},
      doc: {title: 'abcd'}
    };
    let action = DocumentActions.UPDATE_DOCUMENTS;
    alt.dispatcher.dispatch({action, data});
    expect(DocumentStore.setState().categories.called).toBe(true);
    DocumentActions.updateDocuments.restore();
  });
});
