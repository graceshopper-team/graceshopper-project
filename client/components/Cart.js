import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/allProducts';

const shipping = 10;
const tax = 0.07;

// const dummyData = [
//   {
//     name: 'Dummyitem1',
//     price: 10,
//     quantity: 2,
//     id: 1,
//     imageUrl:
//       'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fselectall%2F2017%2F03%2F15%2F15-link.w190.h190.jpg&f=1&nofb=1',
//     inventory: 50,
//   },
//   {
//     name: 'Dummyitem2',
//     price: 19,
//     quantity: 2,
//     id: 2,
//     imageUrl:
//       'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fselectall%2F2017%2F03%2F15%2F15-link.w190.h190.jpg&f=1&nofb=1',
//     inventory: 50,
//   },
//   {
//     name: 'Dummyitem3',
//     price: 14,
//     quantity: 1,
//     id: 3,
//     imageUrl:
//       'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fselectall%2F2017%2F03%2F15%2F15-link.w190.h190.jpg&f=1&nofb=1',
//     inventory: 50,
//   },
// ];

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
      <div id="cartHolder">
        <div id="cartContainer">
          <div id="cartLeft">
            <h2>
              {cartList.length === 0
                ? 'Shopping Cart Is Empty :('
                : 'Shopping Cart'}
            </h2>

            {cartList.map((element) => {
              return (
                <div key={element.id} id="itemList">
                  <div>
                    <img id="cartListImage" src={element.imageUrl} />
                  </div>
                  <div id="productName">
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

          <div id="cartRight">
            <Link to={'/ordered'}>
              <div id="cartRightButton">
                <p>Place Order</p>
              </div>
            </Link>
            <h2>Order Summary</h2>
            <div id="orderSumHolder">
              <div id="orderSumHolderLeft">
                <ul>
                  <li>Items: ({this.state.items})</li>
                  <li>Shipping:</li>
                  <li>Before Tax:</li>
                  <li>Estimated Tax:</li>
                </ul>
              </div>

              <div id="orderSumHolderRight">
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
    products: state.allProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
