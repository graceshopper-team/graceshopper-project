import React from 'react';
import { connect } from 'react-redux';
import GenerateHearts from '../allFoods/GenerateHearts.js';

// imports below to be used in the mapDispatchToProps,
// then the func name assigned to store functions there to be used where needed.
//  (example in commented-out componentDidMount func)
//
import { fetchSingleProduct } from '../../store/singleProduct.js';

//TODO:
//1) import ... from store/singleProduct and map to props
//2) map props to state (product, so we can use that on addToCart)
//2) add componentDidMount to get the product based on the id in URL, using get func passed to the props.
//3) redo with real data gotten from the DB
//
//4) add addToCart functionality

class SingleFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };

    // thinking assigning inventory to state might be a good way to get the inventory
    // to dynamically update as product is added to cart.
    // Probably not needed, but food for thought.
    // this.state = {
    //   inventory: 0
    // }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO: get Product based on ID in the URL
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.getSingleProduct(productId);
  }

  // maybe add componentWillUnmount to clear props after unmounting?

  // will update product inventory after it updates post-mount
  // componentDidUpdate(prevProps) {
  //   if (prevProps.product.id !== this.props.product.id) {
  //     this.setState({
  //       inventory: this.props.product.inventory || 0
  //     });
  //   }
  // }

  // change inventory in state to value selected in quantity selection
  handleChange(evt) {
    evt.preventDefault();
    const action = evt.target.getAttribute('name');
    if (action === 'up') {
      let total = this.state.count + 1;
      if (total <= this.props.product.inventory) {
        this.setState({ count: total });
      }
    } else if (action === 'down') {
      let total = this.state.count - 1;
      if (total >= 1) this.setState({ count: total });
    }
  }

  // add item to cart
  // passes product from props & state => {inventory: (quantity to be added to cart)}
  // dont know if best way, maybe pass product in state & quantity as 2nd param
  handleSubmit(evt) {
    evt.preventDefault();
    console.log('hey, you hit submit');
    //this.props.addToCart({ ...this.props.product}, { ...this.state });
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

    //const { id, name, description, category, hearts, inventory, cost, imageUrl } = fakeData;

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

            <p>
              <small>quantity available: {inventory}</small>
            </p>
            <div>
              <button
                type="addToCart"
                onClick={(event) => this.handleSubmit(event)}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.singleProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleFood);
