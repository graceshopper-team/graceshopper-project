import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { fetchProducts, setFilter } from '../../store/allProducts';
import ShoppingCart from '../icons/ShoppingCart';

const shipping = (items) => {
  return Math.floor(items * 1.5);
};
const tax = 0.07;

class AnonCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      cost: 0,
    };
    this.delete = this.delete.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  //calculate total amount of items
  getTotal(arry) {
    /*
    let total = 0;
    arry.map((element) => {
      total += element.quantity;
    });
    return total;
    */
  }

  //calculates the cost of all the items
  getCost(arry) {
    /*
    let cost = 0;
    arry.map((element) => {
      cost += element.quantity * element.product.cost;
    });
    return cost;
    */
  }

  componentDidUpdate(previousProps) {
    //these upodate the total cost for the cart
    /*
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
    */
  }

  //sets up the total cost for the cart when it loads
  componentDidMount() {
    //trusted product info loaded into state
    this.props.setFilter('none');
    this.props.loadAllProducts();

    /*
    if (this.props.cart) {
      let total = this.getTotal(this.props.cart);
      this.setState({ items: total });
      let cost = this.getCost(this.props.cart);
      this.setState({ cost: cost });
    }
    */
  }

  //deletes single product from cart db of user
  delete(evt) {
    evt.preventDefault();
    // const productId = evt.target.getAttribute('name');
    // const userId = this.props.userid;
    // this.props.deleteProduct(userId, productId);
  }

  //deletes all of the carts in db user on 'checkout'
  checkout(evt) {
    evt.preventDefault();
    // const userId = this.props.userid;
    // this.props.deleteCart(userId);
    // this.props.history.push('/ordered');
  }

  render() {
    //where we left off
    const cartListFromStorage =
      JSON.parse(window.localStorage.getItem('CART')) || [];

    //create list of complete product info,
    //the products to grab is based on product in local storage
    let createListFromStateList = [];
    for (let iOuter = 0; iOuter < cartListFromStorage.length; iOuter++) {
      let iInner = 0;
      while (
        iInner < this.props.products.length &&
        cartListFromStorage[iOuter].productId != this.props.products[iInner].id
      ) {
        iInner++;
      }

      //if the while loop ended because it found a match
      if (iInner < this.props.products.length) {
        createListFromStateList.push({
          quantity: cartListFromStorage[iOuter].quantity,
          product: this.props.products[iInner],
        });
      }
    }

    const cartList = createListFromStateList;
    console.log('CartList before render():', cartList);

    return (
      <div id="anon-cart-holder">
        <div id="cart-container">
          <div id="cart-left">
            <h2>
              {cartList.length === 0
                ? 'Shopping Cart Is Empty :('
                : 'Shopping Cart'}
            </h2>

            {cartList.map((element, index) => {
              return (
                <div key={index} id="item-list">
                  <div>
                    <img id="cart-list-image" src={element.product.imageUrl} />
                  </div>
                  <div id="product-name">
                    <p>{element.product.name}</p>
                    Price: {element.product.cost + ' Rupees'} in cart:{' '}
                    {element.quantity}
                  </div>
                </div>
              );
            })}
          </div>

          <div id="cart-right">
            <Link to="/login">
              <div id="cart-right-button">
                <p>Log In To Checkout</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.allProducts.list,
});
const mapDispatchToProps = (dispatch) => ({
  loadAllProducts: () => dispatch(fetchProducts()),
  setFilter: (filter) => dispatch(setFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnonCart);
