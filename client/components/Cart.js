import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const shipping = 10;
const tax = 0.07;

const dummyData = [
  { name: 'dummyitem', price: 10, quantity: 2, id: 1 },
  { name: 'dummyitem2', price: 19, quantity: 2, id: 2 },
  { name: 'dummyitem3', price: 14, quantity: 1, id: 3 },
];

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 4,
      cost: 100,
      data: dummyData,
    };
    this.counter = this.counter.bind(this);
  }
  counter(evt) {
    evt.preventDefault();
    let index = evt.target.value;
    let data = this.state.data;
    data[index].quantity++;
    this.setState = {
      data: data,
    };
  }

  render() {
    const { counter } = this;
    return (
      <div id="cartHolder">
        <div id="cartContainer">
          <div id="cartLeft">
            {dummyData.map((element, index) => {
              return (
                <div key={element.id} id="itemList">
                  <ul>
                    <li>Item Name: {element.name}</li>
                    <li>Price:{element.price}</li>
                    <li>Quantity: {element.quantity}</li>
                    <li>
                      <button
                        value={index}
                        onClick={(evt) => {
                          counter(evt);
                        }}
                      >
                        Increment
                      </button>
                      <button
                        value={element.quantity}
                        onClick={() => element.quantity--}
                      >
                        Decrement
                      </button>
                    </li>
                  </ul>
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

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
