import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MenuItem onTouchTap={this.handleClose}>
        <i className="fa fa-home"></i>
        <a href={'/category?category=' + this.props.title}>{this.props.title}</a>
      </MenuItem>
    )
  }
}
