import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import DocumentActions from '../../actions/documentActions';
import DocumentStore from '../documentStore.js';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Document Store tests', () => {
  it('listens for updateDocuments Actions', () => {
    let data = {
      ownerId : {_id: 12},
      doc: {title: 'abcd'}
    };
    let action = DocumentActions.UPDATE_DOCUMENTS;
    alt.dispatcher.dispatch({action, data});
    expect(DocumentStore.getState().documents.length).toEqual(0);
  });
});
