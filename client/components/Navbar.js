import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
// import "../../public/styles/nav.css";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="navbar">
    <nav>
      <div id="navleft">
        <span id="logo">Hyrule Shopper</span>
      </div>
      <div id="navRight">
        {isLoggedIn ? (
          <ul>
            {/* The navbar will show these links after you log in */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
            <li>Cart</li>
          </ul>
        ) : (
          <ul>
            {/* The navbar will show these links before you log in */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li><a href="">Cart</a></li>
          </ul>
        )}
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
