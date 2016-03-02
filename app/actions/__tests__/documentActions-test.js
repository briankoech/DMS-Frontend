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
      let type = "music";
      DocumentActions.fetchByCategory(type, token);
      expect(DocumentActions.fetchByCategory.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls fetchDocumentsByUser function', () => {
      let token = 'xvjf';
      let id = 'abc';
      DocumentActions.fetchDocumentsByUser(id, token);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
      DocumentActions.fetchDocumentsByUser(id);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls getDocument function', () => {
      let token = 'xvjf';
      let id = 'abc';
      DocumentActions.getDocument(id, token);
      expect(DocumentActions.getDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });

    it('calls createDocument', () => {
      let token = 'xvjf';
      let data = {
        title: 'ABC',
        content: 'lorem ipsum'
      };
      DocumentActions.createDocument(data, token);
      expect(DocumentActions.createDocument.called).toBe(true);
      expect(DocumentActions.updateDocuments.called).toBe(true);
    });
    it('calls updateDocuments on success', () => {
      let token = 'xvjf';
      let data = {
        title: 'ABC',
        content: 'lorem ipsum'
      };
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

  describe('dispatches an error on request failure', () => {
    let err = {
      body: 'error'
    };
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
    });

    it('calls documentsFailed on error', () => {
      let id = 1123,
        token = 'kashjkd';
      DocumentActions.fetchDocumentsByUser(id, token);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.fetchDocumentsByUser.called).toBe(true);
    });

    it('calls getDocument on error', () => {
      let id = 1123,
        token = 'kashjkd';
      DocumentActions.getDocument(id, token);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.getDocument.called).toBe(true);
    });

    it('calls fetchByCategory on error', () => {
      let id = 1123,
        token = 'kashjkd';
      DocumentActions.fetchByCategory(id);
      expect(DocumentActions.documentsFailed.called).toBe(true);
      expect(DocumentActions.fetchByCategory.called).toBe(true);
    });

    it('calls createDocument on error', () => {
      let data = {title: 'TIA'},
        token = 'kashjkd';
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
      let data = {title: 'TIA'},
        token = 'kashjkd',
        id = 123;
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
      let token = 'kashjkd',
        id = 123;
      DocumentActions.deleteDocument(id, token);
      expect(DocumentActions.deleteResponse.called).toBe(true);
      expect(DocumentActions.deleteDocument.called).toBe(true);
    });
  });
});
