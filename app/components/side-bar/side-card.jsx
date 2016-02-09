import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';


const  SideCard = () => (
  <Card>
    <CardMedia
      overlay={<CardTitle title="Brian K" subtitle="brnkoech@gmail.com" />}
    >
      <img src="http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg" />
    </CardMedia>
  </Card>
);

export default SideCard;
