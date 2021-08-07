import React from 'react';
import { increaseQuantityThunk, decreaseQuantityThunk } from '../../store/cart';
import { connect } from 'react-redux';

//This component handles nothing but adding and subtracting total amount of an item in a cart
class QuantityChanger extends React.Component {
  constructor(props) {
    super(props);
    this.decreaseItem = this.decreaseItem.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
  }

  decreaseItem(evt) {
    let quantity = this.props.quantity;
    let id = this.props.cartId;
    if (quantity > 1) {
      quantity--;
      this.props.decreaseQuantity(quantity, id);
    }
  }

  incrementItem(evt) {
    let quantity = this.props.quantity;
    let id = this.props.cartId;
    let inventory = this.props.inventory;
    if (inventory > quantity) {
      quantity++;
      this.props.changeQuantity(quantity, id);
    }
  }

  render() {
    return (
      <span>
        <button
          onClick={(evt) => {
            this.decreaseItem(evt);
          }}
        >
          -
        </button>
        Qty: {this.props.quantity}
        <button
          onClick={(evt) => {
            this.incrementItem(evt);
          }}
        >
          +
        </button>
      </span>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (quantity, rowId) =>
      dispatch(increaseQuantityThunk(quantity, rowId)),
    decreaseQuantity: (quantity, rowId) =>
      dispatch(decreaseQuantityThunk(quantity, rowId)),
  };
};

export default connect(null, mapDispatchToProps)(QuantityChanger);
