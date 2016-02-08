import React from 'react';
import Nav from './nav-bar/app.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
