import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/allCategories';
import { setFilter, fetchProducts } from '../../store/allProducts';
import Binoculars from '../icons/Binoculars';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }
  componentDidMount() {
    this.props.loadAllCategories();
  }

  click(evt) {
    evt.preventDefault();
    const filter = evt.target.getAttribute('name');
    if (filter) {
      this.props.setFilter(filter);
      this.props.fetchProducts(filter);
    }
  }

  render() {
    const filterList = this.props.categories || [];
    return (
      <div id="filter">
        <h1>
          <Binoculars /> Filter
        </h1>
        <div
          onClick={(evt) => {
            this.click(evt);
          }}
        >
          {/* Joe CR: I think using a class might be more elegant than switching element name. */}
          {this.props.filter === 'none' ? (
            <h2 name="none">All</h2>
          ) : (
            <h3 name="none">All</h3>
          )}

          {filterList.map((element, index) => {
            if (this.props.filter === element.name)
              return (
                <h2 name={element.name} key={index}>
                  {element.name}
                </h2>
              );
            else
              return (
                <h3 name={element.name} key={index}>
                  {element.name}
                </h3>
              );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.allProducts.filter,
    categories: state.allCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCategories: () => dispatch(fetchCategories()),
    setFilter: (filter) => dispatch(setFilter(filter)),
    fetchProducts: (filter) => dispatch(fetchProducts(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
