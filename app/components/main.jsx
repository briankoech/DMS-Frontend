import React from 'react';
import App from './app.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <App />
        <div className="">
          {this.props.children}
        </div>
      </div>
    );
  }
}
