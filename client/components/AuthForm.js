import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { addNewUserCartThunk } from '../store/cart';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  
  return (
    <div id="auth-form-holder">
      <div id="auth-form">
        {props.name === 'login' ? (
          <p>Login to your account</p>
        ) : (
          <p>Sign up for an account</p>
        )}
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <br></br>
            <input
              className="input-field"
              name="username"
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <br></br>
            <input
              className="input-field"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>

          {error && error.response && (
            <div id="login-error"> {error.response.data} </div>
          )}
        </form>
      </div>
      {props.name === 'login' ? (
        <Link to={'/signup'}>
          <span>Don't Have An Account? Click Here to Register</span>
        </Link>
      ) : (
        <span></span>
      )}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
