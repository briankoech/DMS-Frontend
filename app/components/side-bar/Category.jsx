import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { browserHistory, Link} from 'react-router';
import Divider from 'material-ui/lib/divider';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.closeNav();
  };

  render() {
    return (
      <a href={`/category?category=${this.props.title}`}>
        <MenuItem onTouchTap={this.handleClick}>
          <i style={{color: '#2196F3'}} className="fa fa-bookmark-o"></i> &nbsp;
          {this.props.title}
        </MenuItem>
        <Divider />
      </a>
    )
  }
}
