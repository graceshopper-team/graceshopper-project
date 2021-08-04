import React from "react";
import { connect } from "react-redux";

// imports below to be used in the mapDispatchToProps, 
// then the func name assigned to store functions there to be used where needed.
//  (example in commented-out componentDidMount func)
//
// import { fetchProduct, buyProduct, addProductToCart? } from '../store/SingleProduct.js'; 

const fakeData = 
  {
    id: 1,
    name: 'Big Hearty Radish',
    description:
      "This hearty radish has grown much larger than the average radish. It's rich in analeptic compounds that, when cooked into a dish, temporarily increase your maximum hearts",
    category: 'Vegetable',
    hearts: 4,
    inventory: 27,
    cost: 10,
    imageUrl:
      'https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417',
  };

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
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.props.getProduct(id);
  // }
  
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
    this.setState({
      inventory: evt.target.value
    });
  }
  
  // add item to cart
  // passes product from props & state => {inventory: (quantity to be added to cart)}
  // dont know if best way, maybe pass product in state & quantity as 2nd param
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.buyProduct({ ...this.props.product}, { ...this.state });
  }
  
  render() {
    // not sure if best practice would be getting ID like this (like in componentDidMount):
    //   const { id } = this.props.match.params;
    //
    // or with everything else like this:
    //   const { product } = this.props;
    //   const { id, name, description, category, hearts, inventory, cost, imageUrl } = product;
    //   const { inventory } = this.state;
    
    const { id, name, description, category, hearts, inventory, cost, imageUrl } = fakeData;
    const quantityToBuyInitialValue = 0;
    
    return (
      <div id={id} className="singleProduct">
        <img src={imageUrl} />
        <div className="productInfo">
          <h1><strong>{name}</strong></h1>
          <h3><b>{cost}</b></h3>
          <p>{description}</p>
          <form id='buyProductForm' onSubmit={this.handleSubmit}>
            <label htmlFor="quantityToBuy">Quantity:</label>
            <input name="quantityToBuy" onChange={this.handleChange} value={quantityToBuyInitialValue} />
            <button type='addToCart'>add to cart</button>
          </form>
          <small>quantity available: {inventory}</small>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   product: state.singleProduct/Food
// });

// const mapDispatchToProps = (dispatch) => ({
//   getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
//   addToCart: (product, quantity) => dispatch(addProductToCart(product, quantity))
// });


export default SingleFood;
//export default connect(mapStateToProps, mapDispatchToProps)(SingleFood);