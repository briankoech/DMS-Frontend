import React from 'react';
import Nav from './nav-bar/app.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: 'Brian',
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container" Trial={this.state.data}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
