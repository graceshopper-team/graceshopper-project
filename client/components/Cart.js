import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, deleteThunk } from '../store/cart';
import { me } from '../store';
import { increaseQuantityThunk, decreaseQuantityThunk } from '../store/cart';

const shipping = 10;
const tax = 0.07;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 4,
      cost: 100,
      clicks: 0,
    };
    this.incrementItem = this.incrementItem.bind(this);
    this.decreaseItem = this.decreaseItem.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate(previousProps) {
    if (this.props.userId.id !== previousProps.userId.id) {
      const userID = this.props.userId;
      this.props.loadCart(userID.id);
    }
  }

  incrementItem(evt) {
    const id = evt.target.getAttribute('name');
    const index = Number(evt.target.getAttribute('title'));
    const inventory = Number(evt.target.value);
    let quantity = this.props.cart[index].quantity;
    if (inventory > quantity) {
      quantity++;
      this.props.increaseQuantity(quantity, id);
    }
  }
  decreaseItem(evt) {
    const id = evt.target.getAttribute('name');
    const index = Number(evt.target.getAttribute('title'));
    let quantity = this.props.cart[index].quantity;
    if (1 < quantity) {
      quantity--;
      this.props.decreaseQuantity(quantity, id);
    }
  }
  delete(evt) {
    const productId = evt.target.getAttribute('name');
    const userId = this.props.userId.id;
    this.props.deleteProduct(userId, productId);
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
                    <img id="cart-list-image" src={element.product.imageUrl} />
                  </div>
                  <div id="product-name">
                    <p>{element.product.name}</p>
                    Price: {element.product.cost + ' Rupees'}
                    <button
                      onClick={(evt) => {
                        this.decreaseItem(evt);
                      }}
                      name={element.id}
                      title={index}
                    >
                      -
                    </button>
                    Qty: {element.quantity}
                    <button
                      onClick={(evt) => {
                        this.incrementItem(evt);
                      }}
                      name={element.id}
                      title={index}
                      value={element.product.inventory}
                    >
                      +
                    </button>
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
            <Link to={'/ordered'}>
              <div id="cart-right-button">
                <p>Place Order</p>
              </div>
            </Link>
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
                  <li>{shipping} Rupees</li>
                  <li>{this.state.cost + shipping}</li>
                  <li>{Math.floor(this.state.cost * tax)} Rupees</li>
                </ul>
              </div>
            </div>
            <h2>
              Order Total:{' '}
              {this.state.cost + shipping + Math.floor(this.state.cost * tax)}{' '}
              Rupees
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth,
    isLoggedIn: !!state.auth.id,
    cart: state.cartReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId) => dispatch(fetchCart(userId)),
    loadInitialData() {
      dispatch(me());
    },
    deleteProduct: (userId, productId) =>
      dispatch(deleteThunk(userId, productId)),
    increaseQuantity: (quantity, rowId) =>
      dispatch(increaseQuantityThunk(quantity, rowId)),
    decreaseQuantity: (quantity, rowId) =>
      dispatch(decreaseQuantityThunk(quantity, rowId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
