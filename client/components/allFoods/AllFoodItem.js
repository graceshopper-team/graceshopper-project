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
    props.addToCartThunk(props.userid, props.id, 1);
    history.push('/cart');
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
