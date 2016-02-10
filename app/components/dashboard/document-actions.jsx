import React from 'react';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

const DocActions = () => (
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
  </div>
);

export default DocActions;
