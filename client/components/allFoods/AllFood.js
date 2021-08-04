import React from 'react';
import { connect } from 'react-redux';
import AllFoodItem from './AllFoodItem';
import { fetchProducts } from '../../store/allProducts';

class AllFood extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    const productsList = this.props.products || [];

    return (
      <div id="allProductsContainer">
        <div id="allProuctsHolder">
          {productsList.map((element) => {
            return (
              <AllFoodItem
                name={element.name}
                key={element.id}
                cost={element.cost}
                imageUrl={element.imageUrl}
                db_id={element.id}
                inventory={element.inventory}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFood);
