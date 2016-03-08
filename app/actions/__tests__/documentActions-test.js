import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import DocumentActions from '../DocumentActions';
import alt from '../../alt';

describe('Document Actions tests', () => {
  describe('Document dispatches the data', () => {
    let dispatcherSpy;
    let updateDocumentsSpy;
    beforeEach(() => {
      // here we use sinon to create a spy on the alt.dispatcher.dispatch function
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
      updateDocumentsSpy = sinon.spy(DocumentActions, 'updateDocuments');

    });

    afterEach(() => {
      // clean up our sinon spy so we do not affect other tests
      alt.dispatcher.dispatch.restore();
      DocumentActions.updateDocuments.restore();
    });

    it('dispatches documents', () => {
      let document = {
          title: 'TIA',
          content: 'ABC'
        },
        action = DocumentActions.UPDATE_DOCUMENTS;

      // fire the action
      DocumentActions.updateDocuments(document);
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload was fired
      var dispatcherArgs = dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      expect(firstArg.action).toBe(action);
      expect(firstArg.data).toBe(document);
    });

  });
  describe('Simulate document fetch success', () => {
    let response = {
      body: ['a', 'b', 'c'],
      statusCode: 200
    };
    let token = 'xvjf';
    let data = {
      title: 'ABC',
      content: 'lorem ipsum'
    };
    let id = 'sdv472vsd674hygg';
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
      sinon.spy(DocumentActions, 'fetchDocumentsByUser');
      sinon.spy(DocumentActions, 'getDocument');
      sinon.spy(DocumentActions, 'getDocumentSuccess');
      sinon.spy(DocumentActions, 'getDocumentError');
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
      DocumentActions.fetchDocumentsByUser.restore();
      DocumentActions.getDocument.restore();
      DocumentActions.getDocumentSuccess.restore();
      DocumentActions.getDocumentError.restore();
    });

    it('calls fetchDocuments function', () => {
      DocumentActions.fetchDocuments(token);
      expect(DocumentActions.fetchDocuments.called).toBe(true);
    });

    it('calls updateDocuments on success', () => {
      DocumentActions.fetchDocuments(token);
      expect(DocumentActions.fetchDocuments.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls fetchByCategory function', () => {
      let type = "music";
      DocumentActions.fetchByCategory(type, token);
      expect(DocumentActions.fetchByCategory.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls fetchDocumentsByUser function', () => {
      DocumentActions.fetchDocumentsByUser(id, token);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
      DocumentActions.fetchDocumentsByUser(id);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls getDocumentSuccess function', () => {
      DocumentActions.getDocument(id, token);
      expect(DocumentActions.getDocumentSuccess.called).toBe(true);
    });

    it('calls createDocument', () => {
      DocumentActions.createDocument(data, token);
      expect(DocumentActions.createDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });
    it('calls updateDocuments on success', () => {
      DocumentActions.updateDocument(data, token);
      expect(DocumentActions.updateDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls deleteDocument on success', () => {
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

  describe('dispatches an error on request failure', () => {
    let err = {
      body: 'error'
    };
    let token = 'kashjkd',
      id = 123;
    beforeEach(() => {
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(err, null);
      });
      sinon.stub(DocumentActions, 'documentsFailed').returns(true);
      sinon.spy(DocumentActions, 'fetchDocumentsByUser');
      sinon.spy(DocumentActions, 'getDocument');
      sinon.spy(DocumentActions, 'fetchByCategory');
      sinon.spy(DocumentActions, 'createDocument');
      sinon.spy(DocumentActions, 'updateDocument');
      sinon.spy(DocumentActions, 'deleteDocument');
      sinon.spy(DocumentActions, 'deleteResponse');
      sinon.spy(DocumentActions, 'getDocumentSuccess');
      sinon.spy(DocumentActions, 'getDocumentError');
    });

    afterEach(() => {
      request.Request.prototype.end.restore();
      DocumentActions.fetchDocumentsByUser.restore();
      DocumentActions.documentsFailed.restore();
      DocumentActions.getDocument.restore();
      DocumentActions.fetchByCategory.restore();
      DocumentActions.createDocument.restore();
      DocumentActions.updateDocument.restore();
      DocumentActions.deleteDocument.restore();
      DocumentActions.deleteResponse.restore();
      DocumentActions.getDocumentSuccess.restore();
      DocumentActions.getDocumentError.restore();
    });

    it('calls documentsFailed on error', () => {
      DocumentActions.fetchDocumentsByUser(id, token);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
    });

    it('calls getDocument on error', () => {
      DocumentActions.getDocument(id, token);
      expect(DocumentActions.getDocumentError.called).toBe(true);
    });

    it('calls fetchByCategory on error', () => {
      DocumentActions.fetchByCategory(id);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.fetchByCategory.called).toBe(true);
    });

    it('calls createDocument on error', () => {
      let data = {title: 'TIA'};
      DocumentActions.createDocument(data);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.createDocument.called).toBe(true);
      request.Request.prototype.end.restore();
      let res = {
        body: {error: 'error'}
      }
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, res);
      });
      DocumentActions.createDocument(data);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.createDocument.called).toBe(true);
    });

    it('calls updateDocument on error', () => {
      let data = {title: 'TIA'};
      DocumentActions.updateDocument(data, token, id);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.updateDocument.called).toBe(true);
      request.Request.prototype.end.restore();
      let res = {
        body: {error: 'error'}
      }
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, res);
      });
      DocumentActions.updateDocument(data, token, id);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.updateDocument.called).toBe(true);
    });

    it('calls deleteDocument on error', () => {
      DocumentActions.deleteDocument(id, token);
      expect(DocumentActions.deleteResponse.called).toBe(true);
      expect(DocumentActions.deleteDocument.called).toBe(true);
    });
  });
});
