import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Select from 'react-select';
require('../../styles/component.css');

class CreateDoc extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  shouldComponentUpdate() {

  }



  handleChange = (event, index, value) => this.setState({value});

  render() {

      var getOptions = function(input, callback) {
        setTimeout(function() {
            callback(null, {
                options: [
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                    { value: 'three', label: 'Three' },
                    { value: 'four', label: 'Four' },
                ],
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
                complete: true,
            });
        }, 3000);
    };

    return (
      <div>
        <h1>Editor page</h1>
        <p>Will act as create page && edit page</p>
        <div className="row">
          <TextField
            className="col-md-5 left"
            hintText="Hint Text"
          />
        <SelectField className="col-md-5 right" value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Never"/>
            <MenuItem value={2} primaryText="Every Night"/>
            <MenuItem value={3} primaryText="Weeknights"/>
            <MenuItem value={4} primaryText="Weekends"/>
            <MenuItem value={5} primaryText="Weekly"/>
          </SelectField>
        </div>
        <div className="row">
          <TextField
            className="col-md-12"
            hintText="Message Field"
            floatingLabelText="Content"
            multiLine={true}
            rows={4}
          />
        </div>
        <div className="row">
          <h5>Add contributors</h5>
        </div>
        <div className="row">
          <Select.Async
            name="form-field"
            className="col-md-6"
            loadOptions={getOptions}
          />
        </div>
        <div className="row">

        </div>
      </div>
    )
  }
}

export default CreateDoc;
