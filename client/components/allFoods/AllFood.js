import React from 'react';
import { connect } from 'react-redux';
import AllFoodItem from './AllFoodItem';
import { fetchProducts, setFilter } from '../../store/allProducts';
import { fetchCategories } from '../../store/allCategories';

import Filter from './Filter';

class AllFood extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setFilter("none"); //make sure if you go back to page nothing is filtered
    this.props.loadAllProducts(this.props.filter);
  }

  render() {
    const productsList = this.props.products || [];

    return (
      <div id="all-products-container">
        <div id="filter-container">
          <Filter />

          <div id="all-proucts-holder">
            {productsList.map((element) => {
              return (
                <AllFoodItem
                  name={element.name}
                  key={element.id}
                  cost={element.cost}
                  imageUrl={element.imageUrl}
                  id={element.id}
                  inventory={element.inventory}
                  hearts={element.hearts}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.allProducts.list,
    filter: state.allProducts.filter,
    categories: state.allCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(fetchProducts()),
    loadAllCategories: () => dispatch(fetchCategories()),
    setFilter: (filter) => dispatch(setFilter(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFood);
