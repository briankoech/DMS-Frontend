(() => {
  'use strict';

  var React = require('react');
  var DocumentStore = require('../stores/DocumentStore');
  var Actions = require('../actions');

  var DocList = React.createClass({
      getInitialState() {

        return DocumentStore.getState();
      },

      componentDidMount() {
        DocumentStore.listen(this.onChange);

        Actions.fetchDocuments();
      },

      componentWillUnmount() {
        DocumentStore.unlisiten(this.onChange);
      },

      onChange(state) {
        this.setState(state);
      },

      render() {
        if(this.state.errorMessage) {
          return (
              <div> something went wrong</div>
          );
        }
        if (!this.state.documents.length) {
          return (
            <div>
              <img src="/my-cool-spinner.gif" />
            </div>
          )
        }
        return (
          <ul>
            {this.state.documents.map((doc) => {
              return (
                <li>{doc.name}</li>
              );
            })}
          </ul>
        )
      }
  });

  module.exports = DocList;

})();
