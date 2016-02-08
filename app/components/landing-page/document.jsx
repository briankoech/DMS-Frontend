import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';


export default class Document extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Card>
        <CardMedia
        >
          <img src="http://lorempixel.com/600/337/nature/" />
        </CardMedia>
        <CardTitle title={this.props.document.title} subtitle="Brian Koech" />
        <CardText>
          <h5>{this.props.document.createdAt}</h5>
        </CardText>
      </Card>
    );
  }
}
