import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllFood from './components/allFoods/AllFood';
import SingleFood from './components/singleFood/SingleFood';
import Cart from './components/cart/Cart';
import OrderConfirmation from './components/OrderConfirmation';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div id="routeHolder">
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={AllFood} />
            <Route path="/products/:productId" component={SingleFood} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/ordered" component={OrderConfirmation} />
            <Redirect to="/products" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllFood} />
            <Route exact path="/products" component={AllFood} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:productId" component={SingleFood} />
            <Route exact path="/ordered" component={OrderConfirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
