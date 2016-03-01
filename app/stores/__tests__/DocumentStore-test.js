import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import DocumentActions from '../../actions/documentActions';
import DocStore, {DocumentStore} from '../documentStore.js';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Document Store tests', () => {
  it('listens for updateDocuments Actions', () => {
    let data = {
      ownerId : {_id: 12},
      doc: {title: 'abcd'}
    };
    let action = DocumentActions.UPDATE_DOCUMENTS;
    alt.dispatcher.dispatch({action, data});
    expect(DocStore.getState().documents.length).toEqual(0);
  });

  it('listens for fetchDocuments Actions', () => {
    sinon.spy(DocumentStore, 'handleFetchDocuments');
    let docstore = AltTestingUtils.makeStoreTestable(alt, DocumentStore);
    docstore.handleFetchDocuments();
    expect(DocStore.getState().documents.length).toEqual(0);
  });

  it('test fetch errors', () => {
    sinon.spy(DocumentStore, 'handleFetchErrors');
    let err = 'error';
    let docstore = AltTestingUtils.makeStoreTestable(alt, DocumentStore);
    console.log('DOCSTORE', docstore);
    docstore.handleFetchErrors(err);
    expect(DocStore.getState().errorMessage).toBe(err);
  });
});
