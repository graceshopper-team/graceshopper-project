import React from 'react';
import { changeQuantityThunk } from '../../store/cart';
import { connect } from 'react-redux';

//This component handles nothing but adding and subtracting total amount of an item in a cart
class QuantityChanger extends React.Component {
  constructor(props) {
    super(props);
    this.decreaseItem = this.decreaseItem.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
  }
  componentDidMount() {
    //makes sure the quantity wanted is not higher than inventory
    if (this.props.quantity > this.props.inventory) {
      this.props.changeQuantity(this.props.quantity, this.props.cartId);
    }
  }

  //changes amount in cart down
  decreaseItem(evt) {
    let quantity = this.props.quantity;
    let cartId = this.props.cartId;
    if (quantity > 1) {
      quantity--;
      this.props.changeQuantity(quantity, cartId, this.props.userId);
    }
  }

  //changes amount in cart up
  incrementItem(evt) {
    let quantity = this.props.quantity;
    let cartId = this.props.cartId;
    let inventory = this.props.inventory;
    if (inventory > quantity) {
      quantity++;
      this.props.changeQuantity(quantity, cartId, this.props.userId);
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (quantity, rowId, userId) =>
      dispatch(changeQuantityThunk(quantity, rowId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityChanger);
