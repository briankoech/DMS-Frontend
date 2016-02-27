import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import DocumentActions from '../documentActions';

describe('Document Actions tests', () =>  {
  describe('Simulate document fetch success', () => {
    let response = {
      body: ['a', 'b', 'c'],
      statusCode: 200
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
      sinon.stub(DocumentActions, 'updateDocuments').returns(true);
      sinon.stub(DocumentActions, 'documentsFailed').returns(true);
      sinon.stub(DocumentActions, 'deleteResponse').returns(true);
      sinon.spy(DocumentActions, 'fetchDocuments');
      sinon.spy(DocumentActions, 'fetchByCategory');
      sinon.spy(DocumentActions, 'createDocument');
      sinon.spy(DocumentActions, 'updateDocument');
      sinon.spy(DocumentActions, 'deleteDocument');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      DocumentActions.updateDocuments.restore();
      DocumentActions.documentsFailed.restore();
      DocumentActions.fetchDocuments.restore();
      DocumentActions.fetchByCategory.restore();
      DocumentActions.createDocument.restore();
      DocumentActions.updateDocument.restore();
      DocumentActions.deleteDocument.restore();
      DocumentActions.deleteResponse.restore();
    });

    it('calls fetchDocuments function', () => {
      let token = 'xvjf';
      DocumentActions.fetchDocuments(token);
      expect(DocumentActions.fetchDocuments.called).toBe(true);
    });

    it('calls updateDocuments on success', () => {
      let token = 'xvjf';
      DocumentActions.fetchDocuments(token);
      expect(DocumentActions.fetchDocuments.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls fetchByCategory function', () => {
      let token = 'xvjf';
      let type="music";
      DocumentActions.fetchByCategory(type, token);
      expect(DocumentActions.fetchByCategory.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });
    it('calls createDocument', () => {
      let token = 'xvjf';
      let data = {title: 'ABC', content: 'lorem ipsum'};
      DocumentActions.createDocument(data, token);
      expect(DocumentActions.createDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });
    it('calls updateDocuments on success', () => {
      let token = 'xvjf';
      let data = {title: 'ABC', content: 'lorem ipsum'};
      DocumentActions.updateDocument(data, token);
      expect(DocumentActions.updateDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls deleteDocument on success', () => {
      let token = 'xvjf';
      let id = 'sdv472vsd674hygg';
      DocumentActions.deleteDocument(id, token);
      expect(DocumentActions.deleteDocument.called).toBe(true);
      expect(DocumentActions.deleteResponse.called).toBe(true);
    });
  });

  describe('simulate documents fetch error', () => {
    let err = {
      body: {
        error: 'could not fetch documents'
      },
      statusCode: 404
    };
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      sinon.stub(DocumentActions, 'documentsFailed').returns(true);
      sinon.spy(DocumentActions, 'fetchDocuments');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      DocumentActions.documentsFailed.restore();
      DocumentActions.fetchDocuments.restore();
    });

    it('calls documentFailed on error', () => {
      DocumentActions.fetchDocuments();
      expect(DocumentActions.fetchDocuments.called).toBe(true);
      expect(DocumentActions.documentsFailed.called).toBe(true);
    });
  });
});
