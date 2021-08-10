import React from 'react';
import { connect } from 'react-redux';
import GenerateHearts from '../allFoods/GenerateHearts.js';

import { fetchSingleProduct } from '../../store/singleProduct.js';
import { addToCartThunk, fetchCart } from '../../store/cart';

class SingleFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      rowId: null,
      totalInCart: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkQtyInCart = this.checkQtyInCart.bind(this);
  }

  checkQtyInCart() {
    const { productId } = this.props.match.params;
    let inCart = this.props.cart.find((element) => {
      if (element.productId === Number(productId)) return element;
    });
    if (inCart) {
      let count = 1;
      if (inCart.quantity >= this.props.product.inventory) {
        count = 0;
      }
      this.setState({
        count: count,
        rowId: inCart.id,
        totalInCart: inCart.quantity,
      });
    }
  }

  // get Product based on ID in the URL
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.getSingleProduct(productId);

    //this is needed if u go back to this component, as these props will already be defined
    if (this.props.userId) {
      this.props.fetchCart(this.props.userId);
      this.checkQtyInCart();
    }
  }

  componentDidUpdate(previousProps) {
    //checks if userid is loaded on props and then gets updated cart
    if (previousProps.userId !== this.props.userId) {
      this.props.fetchCart(this.props.userId);
    }
    //checks if the cart is loaded on props
    if (previousProps.cart !== this.props.cart) {
      this.checkQtyInCart();
    }
  }

  // change inventory in state to value selected in quantity selection
  handleChange(evt) {
    evt.preventDefault();
    const action = evt.target.getAttribute('name');
    if (action === 'up') {
      let total = this.state.count + 1;
      if (
        total <= this.props.product.inventory &&
        total + this.state.totalInCart <= this.props.product.inventory
      ) {
        this.setState({ count: total });
      }
    } else if (action === 'down') {
      let total = this.state.count - 1;

      if (total >= 1) {
        this.setState({ count: total });
      }
    }
  }

  // add item to cart
  // passes product from props & state => {inventory: (quantity to be added to cart)}
  // dont know if best way, maybe pass product in state & quantity as 2nd param
  handleSubmit(evt) {
    evt.preventDefault();

    console.log(this.state.count);
    this.props.addToCartThunk(
      this.props.userId,
      this.props.product.id,
      this.state.count
    );
  }

  render() {
    // not sure if best practice would be getting ID like this (like in componentDidMount):
    //   const { id } = this.props.match.params;
    //
    // or with everything else like this:
    const product = this.props.product || {};
    const {
      id,
      name,
      description,
      hearts,
      inventory,
      category,
      cost,
      imageUrl,
    } = product;
    let type = category || 'none';
    if (category) type = category.name; //have to do this
    //   const { inventory } = this.state;

    //const { id, name, description, category, hearts, inventory, cost, imageUrl } = fakeData

    return (
      <div id={id} className="single-product-container">
        <h1 id="single-product-title">
          <strong>{name}</strong>
        </h1>
        <div id="single-product-box">
          <div id="left-column">
            <img src={imageUrl} />
          </div>
          <div id="right-column">
            <h1>
              <b>
                {cost} Rupees <GenerateHearts hearts={hearts} />
              </b>
            </h1>
            <p>{description}</p>
            <span>
              <h2>Category: {type}</h2>
            </span>

            <h4>
              <button
                id="counter"
                name="down"
                onClick={(event) => {
                  this.handleChange(event);
                }}
              >
                -
              </button>{' '}
              {this.state.count}{' '}
              <button
                id="counter"
                name="up"
                onClick={(event) => {
                  this.handleChange(event);
                }}
              >
                +
              </button>
            </h4>

            <p>quantity available: {inventory}</p>
            <p>total in cart: {this.state.totalInCart}</p>

            <div>
              {this.state.count === 0 ? (
                <button
                  type="addToCart"
                  disabled
                  onClick={(event) => this.handleSubmit(event)}
                >
                  add to cart
                </button>
              ) : (
                <button
                  type="addToCart"
                  onClick={(event) => this.handleSubmit(event)}
                >
                  add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.singleProduct,
  cart: state.cartReducer,
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  addToCartThunk: (userId, productId, quantity) =>
    dispatch(addToCartThunk(userId, productId, quantity)),
  fetchCart: (userId) => dispatch(fetchCart(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleFood);
