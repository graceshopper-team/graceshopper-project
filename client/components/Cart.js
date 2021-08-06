import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/allProducts';

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
  }
  componentDidMount() {
    this.props.loadAllProducts();
  }

  incrementItem() {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  decreaseItem() {
    this.setState({ clicks: this.state.clicks - 1 });
  }

  render() {
    const cartList = this.props.products || [];
    const { incrementItem, decreaseItem } = this;
    return (
      <div id="cart-holder">
        <div id="cart-container">
          <div id="cart-left">
            <h2>
              {cartList.length === 0
                ? 'Shopping Cart Is Empty :('
                : 'Shopping Cart'}
            </h2>

            {cartList.map((element) => {
              return (
                <div key={element.id} id="item-list">
                  <div>
                    <img id="cart-list-image" src={element.imageUrl} />
                  </div>
                  <div id="product-name">
                    <p>{element.name}</p>
                    Price: {element.cost + ' Rupees'}
                    <button onClick={decreaseItem}>-</button>
                    Qty: {this.state.clicks}
                    <button onClick={incrementItem}>+</button>
                  </div>
                  <button type="button" className="delete">
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
    products: state.allProducts.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
