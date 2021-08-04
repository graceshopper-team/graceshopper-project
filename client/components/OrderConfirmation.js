import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div id="confirmationHolder">
      <div id="confirmationContainer">
        <p>
          Congratulations, <br></br> Your Order Has Been Placed!
        </p>
        <Link to={'/products'}>
          <div id="confirmationButton">
            <p>Continue Shopping</p>
          </div>
        </Link>
      </div>
    </div>
  );
}