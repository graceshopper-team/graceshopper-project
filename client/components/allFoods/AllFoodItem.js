import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '../icons/ShoppingCart';
import GenerateHearts from './GenerateHearts';

export default function AllFoodItem(props) {
  function click(evt) {
    evt.preventDefault();
    console.log(
      'add to cart button clicked for',
      props.name,
      'id is',
      props.db_id
    );
  }
  return (
    <div className="allFoodItem">
      <Link to={`/products/${props.db_id}`}>
        <img src={props.imageUrl} alt={`${props.name}'s image`} />
      </Link>
      <div id="allItemInfo">
        <Link to={`/products/${props.db_id}`}>
          <p className="allItemName"> {props.name}</p>
        </Link>
        <p><GenerateHearts hearts={props.hearts}/></p>
        <p className="allItemPrice"> {props.cost} Rupees</p>

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
            <ShoppingCart/>  Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}
