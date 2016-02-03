import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import SideCard from './side-card.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {this.setState({open: !this.state.open}); console.log('Cliked');};

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar
          title="DMS"
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle}>
              <FontIcon className="muidocs-icon-action-home"><i className="fa fa-bars"></i></FontIcon>
            </IconButton>
          }
          iconElementRight={
            <span>
              <FlatButton label="Login" />
              <FlatButton label="Sign up" />
            </span>
            }
        />
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >


          <SideCard />
          <MenuItem onTouchTap={this.handleClose}> <i className="fa fa-home"></i> Home</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
