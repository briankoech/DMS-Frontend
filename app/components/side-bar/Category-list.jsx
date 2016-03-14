import React from 'react';
import Category from './Category.jsx';
import CategoryStore from '../../stores/CategoryStore';
import CategoryAction from '../../actions/CategoryActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import { FormsyText } from 'formsy-material-ui';

class CategoryList extends React.Component {
  constructor(props) {
   super(props);
    this.state = {
      categories: [],
      canSubmit: false
    }
  }

  // static getStores(props) {
  //   return [CategoryStore];
  // }
  // static getPropsFromStores(props) {
  //   return CategoryStore.getState();
  // }

  componentWillMount() {
    CategoryAction.fetchCategory();
  }

  componentDidMount() {
     CategoryStore.listen(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange = (state) => {
    this.setState({categories: state.categories});
  };

  handleCreateCategory = (model, resetForm) => {
    let token = localStorage.getItem('x-access-token');
    CategoryAction.addCategory(model, token);
    CategoryAction.fetchCategory();
    resetForm();
  };

  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };
  render() {
    // nodes
    var categoryNodes = this.state.categories.map((category) => {
      return (
        <Category closeNav={this.props.closeNav} key={category._id} title={category.category} />
      );
    });

    return (
      <div>
        {categoryNodes}
        {
          this.props.isLoggedIn ?
            <div className="row" style={{margin: 5}}>
              <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleCreateCategory}>
                <FormsyText className="" name='category' validations='isWords' validationError="Please use letters only" required hintText="Education" floatingLabelText="Category Type"/>
                <FloatingActionButton mini={true} type="submit" disabled={!this.state.canSubmit}>
                  <ContentAdd />
                </FloatingActionButton>
              </Formsy.Form>
            </div>
          : null
        }
      </div>
    );
  }
}
export default CategoryList;
// export default connectToStores(CategoryList);
