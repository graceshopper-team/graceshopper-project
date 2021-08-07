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
  componentDidMount(){
    //makes sure the quantity wanted is not higher than inventory
    if(this.props.quantity > this.props.inventory) {
      this.props.changeQuantity(this.props.quantity, this.props.cartId);
    }
  }

  //changes amount in cart down
  decreaseItem(evt) {
    let quantity = this.props.quantity;
    let id = this.props.cartId;
    if (quantity > 1) {
      quantity--;
      this.props.changeQuantity(quantity, id);
    }
  }

  //changes amount in cart up
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
      dispatch(changeQuantityThunk(quantity, rowId)),
  }
};

export default connect(null, mapDispatchToProps)(QuantityChanger);
