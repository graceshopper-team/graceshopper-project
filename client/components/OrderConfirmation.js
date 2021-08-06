import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div id="confirmation-holder">
      <div id="confirmation-container">
        <h1>Congratulations,</h1>
        <p> Your Order Has Been Placed! </p>
        <Link to={'/products'}>
          <div id="confirmation-button">
            <p>Continue Shopping</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
