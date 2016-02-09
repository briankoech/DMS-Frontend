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
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/send';

const colors = styles.Colors;

export default class Document extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render () {
    return (
      <Card style={{margin: 15}}>
        <CardMedia
        >
          <img src="http://lorempixel.com/600/337/nature/" />
        </CardMedia>
        <div className="row">
          <div className="col-md-10" >
            <CardTitle title={this.props.document.title} />
          </div>
          <div className="col-md-2">
            <FloatingActionButton primary>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <Divider />
        <CardActions>
          <CardText>
            <div className="row" style={{marginBottom: 10}}>
              <div className="col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2"
              >
                <Avatar
                  icon={<FontIcon className="fa fa-user" />}
                  color={Colors.blue500}
                />
              </div>
              <div className="col-md-4">
                Brian Koech
              </div>
              <div className="col-md-6">
                7th Feb in Programming
              </div>
              {/*{this.props.document.ownerId}*/}
              {/*{this.props.document.createdAt}*/}
              {/*{this.props.document.category}*/}
            </div>
            {
              (this.props.role === 'admin') ?
              <div>
            <Divider />
            <div className="row right" style={{marginTop: 20}}>
              <div className="col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2">
                <IconButton tooltip="Delete">
                  <FontIcon
                      className="fa fa-trash-o"
                      color={Colors.blue500}
                  />
                </IconButton>
              </div>
              <div className="col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2">
                <IconButton tooltip="Edit document">
                  <FontIcon
                      className="fa fa-pencil"
                      color={Colors.blue500}
                  />
                </IconButton>
              </div>
              <div className="col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2">

                  <IconButton tooltip="More info">
                    <FontIcon
                        className="fa fa-info-circle"
                        color={Colors.blue500}
                        tooltip="More info"
                    />
                  </IconButton>
              </div>
            </div>
          </div> : <div></div>
          }
          </CardText>
        </CardActions>
      </Card>
    );
  }
}
