import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { fetchCart, deleteThunk, deleteCartThunk } from '../../store/cart';
import QuantityChanger from './QuantityChanger';
import ShoppingCart from '../icons/ShoppingCart';

const shipping = (items) => {
  return Math.floor(items * 1.5);
};
const tax = 0.07;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      cost: 0,
    };
    this.delete = this.delete.bind(this);

    // Joe CR: Is this necessary? Why/why not?
    this.getTotal = this.getTotal.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  //calculate total amount of items
  getTotal(arry) {
    let total = 0;
    arry.map((element) => {
      total += element.quantity;
    });
    return total;
  }

  //calculates the cost of all the items
  getCost(arry) {
    let cost = 0;
    arry.map((element) => {
      cost += element.quantity * element.product.cost;
    });
    return cost;
  }

  componentDidUpdate(previousProps) {
    //these upodate the total cost for the cart
    if (previousProps.cart.length > 0) {
      if (this.state.items !== this.getTotal(previousProps.cart)) {
        let total = this.getTotal(previousProps.cart);
        this.setState({ items: total });
      }
      if (this.state.cost !== this.getCost(previousProps.cart)) {
        let cost = this.getCost(previousProps.cart);
        this.setState({ cost: cost });
      }
    }
  }

  //sets up the total cost for the cart when it loads
  componentDidMount() {
    if (this.props.cart) {
      // Joe CR: I'm not sure state is needed here. Let's discuss.
      let total = this.getTotal(this.props.cart);
      this.setState({ items: total });
      let cost = this.getCost(this.props.cart);
      this.setState({ cost: cost });
    }
  }

  //deletes single product from cart db of user
  delete(evt) {
    evt.preventDefault();
    const productId = evt.target.getAttribute('name');
    const userId = this.props.userid;
    this.props.deleteProduct(userId, productId);
  }

  //deletes all of the carts in db user on 'checkout'
  checkout(evt) {
    evt.preventDefault();
    const userId = this.props.userid;
    this.props.deleteCart(userId);
    this.props.history.push('/ordered');
  }

  render() {
    const cartList = this.props.cart || [];

    return (
      <div id="cart-holder">
        <div id="cart-container">
          <div id="cart-left">
            <h2>
              {cartList.length === 0
                ? 'Shopping Cart Is Empty :('
                : 'Shopping Cart'}
            </h2>

            {cartList.map((element, index) => {
              return (
                <div key={element.id} id="item-list">
                  <div>
                    <Link to={`/products/${element.productId}`}>
                      <img
                        id="cart-list-image"
                        src={element.product.imageUrl}
                      />
                    </Link>
                  </div>
                  <div id="product-name">
                    <Link to={`/products/${element.productId}`}>
                      <p>{element.product.name}</p>
                    </Link>
                    Price: {element.product.cost + ' Rupees'}
                    <QuantityChanger
                      index={index}
                      cartId={element.id}
                      productId={element.product.id}
                      quantity={element.quantity}
                      inventory={element.product.inventory}
                    />
                    <small>available: {element.product.inventory}</small>
                  </div>
                  <button
                    type="button"
                    className="delete"
                    name={element.product.id}
                    onClick={(event) => {
                      this.delete(event);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>

          <div id="cart-right">
            {cartList.length === 0 ? (
              <div id="cart-right-button">
                <p>Cart is empty</p>
              </div>
            ) : (
              <div
                id="cart-right-button"
                onClick={(evt) => {
                  this.checkout(evt);
                }}
              >
                <p>
                  <ShoppingCart /> Place Order
                </p>
              </div>
            )}

            <h2>Order Summary</h2>
            <div id="order-sum-holder">
              <div id="order-sum-holder-left">
                <ul>
                  <li>Items: ({this.state.items})</li>
                  <li>Shipping:</li>
                  <li>Before Tax:</li>
                  <li>Estimated Tax:</li>
                </ul>
              </div>

              <div id="order-sum-holder-right">
                <ul>
                  <li>{this.state.cost} Rupees</li>
                  <li>{shipping(this.state.items)} Rupees</li>
                  <li>{this.state.cost + shipping(this.state.items)} Rupees</li>
                  <li>{Math.floor(this.state.cost * tax)} Rupees</li>
                </ul>
              </div>
            </div>
            <h2>
              Order-Total:{' '}
              {this.state.cost +
                shipping(this.state.items) +
                Math.floor(this.state.cost * tax)}{' '}
              <small>Rupees</small>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
    userid: state.auth.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId) => dispatch(fetchCart(userId)),
    deleteProduct: (userId, productId) =>
      dispatch(deleteThunk(userId, productId)),
    deleteCart: (userId) => dispatch(deleteCartThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
