import React from 'react';
import { connect } from 'react-redux';

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
    // consider doing check here if value > inventory available
    // this.setState({
    //   inventory: evt.target.value
    // });
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
      category,
      hearts,
      inventory,
      cost,
      imageUrl,
    } = product;
    //   const { inventory } = this.state;

    //const { id, name, description, category, hearts, inventory, cost, imageUrl } = fakeData;
    const quantityToBuyInitialValue = 0;

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
            <h3>
              <b>{cost} Rupees</b>
            </h3>
            <p>{description}</p>
            <form id="buyProductForm" onSubmit={this.handleSubmit}>
              <label htmlFor="quantityToBuy">Quantity:</label>
              <input
                name="quantityToBuy"
                onChange={this.handleChange}
                value={quantityToBuyInitialValue}
              />
              <button type="addToCart">add to cart</button>
            </form>
            <small>quantity available: {inventory}</small>
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
