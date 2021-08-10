import React from 'react';
import { connect } from 'react-redux';
import GenerateHearts from '../allFoods/GenerateHearts.js';
import { PageNotFound } from '../../Routes.js';
import { fetchSingleProduct, clearProduct } from '../../store/singleProduct.js';
import { addToCartThunk, fetchCart } from '../../store/cart';
import { ToastContainer, toast } from 'react-toastify';

class SingleFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      isValid: false,
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

  componentWillUnmount() {
    this.props.clear();
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

    if (this.props.product !== previousProps.product) {
      if (this.props.product !== 'invalid') {
        this.setState({ isValid: true });
      }
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
    
    //pretty pop-up toast window notification
    toast.dark(
      `Added ${this.state.count} ${this.props.product.name} To Your Cart`,
      {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    
    //if user signed in, business as normal
    if(this.props.userId){
      this.props.addToCartThunk(
        this.props.userId,
        this.props.product.id,
        this.state.count
      );
      
    } else { //else, local cart solution:
    
      //create a object containing the product info for local storage use
      //TODO: add check to limit adding products to local-cart beyond inventory limits
      const newCartItem = {
        quantity: this.state.count,
        productId: this.props.product.id,
      };
      
      //if cart exists in local storage, add to it
      if(window.localStorage.getItem('CART')){
        console.log('local cart exists, adding to it (in SingleFood)');
        let existingLocalCart = JSON.parse(window.localStorage.getItem('CART'));
        console.log('parsed existing cart:', existingLocalCart);
        
        //loop through existing cart to see if item being added exists in cart already
        let itemExists = false;
        existingLocalCart.forEach((product, index) => {
          
          //if it does, then increment the quantity of it appropriately 
          if(product.productId == newCartItem.productId){
            existingLocalCart[index].quantity += newCartItem.quantity; 
            itemExists = true;
          }
        });
        
        //if it doesnt exist already, then push the new item object to existing local cart
        if(!itemExists) existingLocalCart.push(newCartItem);
        
        //2 back 2 string
        let stringCart = JSON.stringify(existingLocalCart);
        window.localStorage.setItem('CART', stringCart);
        
      } else {
        console.log("no local cart, creating one (in SingleFood)");
        
        let stringCart = JSON.stringify([newCartItem]);
        window.localStorage.setItem('CART', stringCart);
      }
      
    }
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
        {this.state.isValid === true ? (
          <span>
            {' '}
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
                    className="upDown"
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
                    className="upDown"
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
                {(this.props.userId) && <p>total in cart: {this.state.totalInCart}</p>}

                <div>
                  {this.state.count === 0 ? (
                    <button
                      className="addToCart"
                      type="addToCart"
                      disabled
                      onClick={(event) => this.handleSubmit(event)}
                    >
                      add to cart
                    </button>
                  ) : (
                    <button
                      className="addToCart"
                      type="addToCart"
                      onClick={(event) => this.handleSubmit(event)}
                    >
                      add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Same as */}
            <ToastContainer />
          </span>
        ) : this.props.product === 'invalid' ? (
          <PageNotFound />
        ) : (
          <div id="product-loading">
            <h1>loading</h1>
          </div>
        )}
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
  clear: () => dispatch(clearProduct()),
  addToCartThunk: (userId, productId, quantity) =>
    dispatch(addToCartThunk(userId, productId, quantity)),
  fetchCart: (userId) => dispatch(fetchCart(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleFood);
