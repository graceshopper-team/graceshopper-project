import React from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../../store/allProducts';
import AllFoodItem from '../allFoods/AllFoodItem.js';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let location = this.props.match.params.query;
    this.props.searchProducts(location);
  }
  componentDidUpdate(previousProps) {
    if (previousProps.match.params.query !== this.props.match.params.query) {
      let location = this.props.match.params.query;
      this.props.searchProducts(location);
    }
  }

  render() {
    let result = this.props.results || [];

    return (
      <div id="searchHolder">
        <div id="searchContainer">
          <h1>
            ({result.length}) Results Found For: {this.props.match.params.query}
          </h1>
          <div id="resultHolder">
          {result.map((element, index) => {
            return (
              <span key={index}>
                <AllFoodItem
                  name={element.name}
                  key={element.id}
                  cost={element.cost}
                  imageUrl={element.imageUrl}
                  id={element.id}
                  inventory={element.inventory}
                  hearts={element.hearts}
                />
              </span>
            );
          })}

          </div>

        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    results: state.allProducts.list,
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchProducts: (query) => dispatch(fetchSearch(query)),
  };
};

export default connect(mapState, mapDispatch)(ProductSearch);
