import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '../icons/ShoppingCart';
import GenerateHearts from './GenerateHearts';
import { connect } from 'react-redux';
import AllFood from './AllFood';
import { addToCartThunk } from '../../store/cart';
import { useHistory } from 'react-router-dom';

const AllFoodItem = (props) => {
  const history = useHistory();
  function click(evt) {
    evt.preventDefault();
    
    //if this is a logged in user use redux store
    if(props.userid) {
      props.addToCartThunk(props.userid, props.id, 1);
      history.push('/cart');
    } else {
      //create a object containing the product info for local storage use
      //TODO: add check to limit adding products to local-cart beyond inventory limits
      const newCartItem = {
        quantity: 1,
        productId: props.id,
      };
      
      //if cart exists in local storage, add to it
      if(window.localStorage.getItem('CART')){
        console.log('it exists');
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
        console.log("it doesn't exist");
        let stringCart = JSON.stringify([newCartItem]);
        window.localStorage.setItem('CART', stringCart);
      }
      
      history.push('/cart');
    }
  }
  return (
    <div className="all-food-item">
      <Link to={`/products/${props.id}`}>
        <img src={props.imageUrl} alt={`${props.name}'s image`} />
      </Link>
      <div id="allItemInfo">
        <Link to={`/products/${props.id}`}>
          <p className="all-item-name"> {props.name}</p>
        </Link>
        <p>
          <GenerateHearts hearts={props.hearts} />
        </p>
        <p className="all-item-price"> {props.cost} Rupees</p>

        {props.inventory === 0 ? (
          <div className="oos">
            <p>Out Of Stock</p>
          </div>
        ) : (
          <button
            onClick={(evt) => {
              click(evt);
            }}
          >
            <ShoppingCart /> Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userid: state.auth.id,
});
const mapDispatchToProps = (dispatch) => ({
  addToCartThunk: (userId, productId, quantity) =>
    dispatch(addToCartThunk(userId, productId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllFoodItem);
