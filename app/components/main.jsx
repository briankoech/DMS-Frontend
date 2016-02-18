import React from 'react';
import Nav from './nav-bar/app.jsx';
import TitleHead from './nav-bar/title-head.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="spacer"></div>
        <div id="startchange" className="container titlehead">
          <TitleHead />
        </div>
        <div className="container content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
