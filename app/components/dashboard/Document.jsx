import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import styles from 'material-ui/lib/styles';
import Avatar from 'material-ui/lib/avatar';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Info from 'material-ui/lib/svg-icons/action/info';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Content from 'material-ui/lib/svg-icons/content/send';
import {Router, Route, Link} from 'react-router';
import moment from 'moment';

import DocumentActions from '../../actions/DocumentActions';
import DocumentStores from '../../stores/DocumentStore';
const colors = styles.Colors;

export default class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {docId: ''}
  }

  componentDidMount() {
    this.setState({docId: this.props.document._id});
  }

  componentWillUnmount() {}

  render () {
    let ActionNodes = () => {
      if(this.props.user._id === this.props.document.ownerId._id) {
        return (
          <div>
            <MenuItem primaryText="Edit" leftIcon={<Edit />} href={'/edit?document=' + this.props.document._id}/>
          </div>
        );
      } else {
        return;
      }
    }
    return (
      <Card style={{margin: 15}}>
        <CardMedia
        >
          <img src={`http://lorempixel.com/600/337/technics/${this.props.index}`} />
        </CardMedia>
        <div className="row">
          <div className="col-xs-12
                col-sm-12
                col-md-12
                col-lg-12 card-title" >
            <Link to={`/document/${this.props.document._id}`}>
              <CardTitle actAsExpander expandable showExpandableButton title={this.props.document.title} />
            </Link>
          </div>
        </div>
        <Divider />
        <CardActions>
          <CardText>
            <div className="row card-text">
              <div className="start-md col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2"
              >
                <Avatar
                  src="http://lorempixel.com/600/337/people/"
                  color={Colors.blue500}
                />
              </div>
              <div className="start-xs col-xs-8
                col-sm-8
                col-md-8
                col-lg-8">
                <div className="username">
                  <a href={'/author?user=' + this.props.document.ownerId._id}>{this.props.document.ownerId.username}  </a><br />
                  <span className="date">{moment(this.props.document.createdAt).format('MMM Do')}  </span>
                  in &nbsp;
                  <span className="category">
                  <a href={'/category?category='+ this.props.document.category.category}>
                      {this.props.document.category.category}
                  </a>
                  </span>
                </div>
                <span className="info">

                </span>
              </div>
              <div className="end-xs col-xs-1
                col-sm-1
                col-md-1
                col-lg-1">
                <IconMenu
                   iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 >
                   <MenuItem primaryText="More info" href={'/document/' + this.props.document._id} leftIcon={<Info />}/>
                   {ActionNodes()}
                 </IconMenu>
              </div>
            </div>
          </CardText>
        </CardActions>
      </Card>
    );
  }
}
