import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

class SideCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.user);
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title={this.props.username || 'DMS'} subtitle={this.props.email || 'crete, edit && save'} />}
        >
          <img src="http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg" />
        </CardMedia>
      </Card>
    );
  }
}

export default SideCard;
