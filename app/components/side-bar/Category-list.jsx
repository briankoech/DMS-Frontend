import React from 'react';
import Category from './Category.jsx';
import CategoryStore from '../../stores/CategoryStore';
import CategoryAction from '../../actions/CategoryActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class CategoryList extends React.Component {
  constructor() {
   super();
    this.state = {
      categories: []
    }
  }

  static getStores(props) {
    return [CategoryStore];
  }
  static getPropsFromStores(props) {
    return CategoryStore.getState();
  }

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
      </div>
    );
  }
}
//export default CategoryList;
export default connectToStores(CategoryList);
