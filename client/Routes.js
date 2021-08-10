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
import ProductSearch from './components/productSearch/ProductSearch';

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
            <Route path="/search/:query" component={ProductSearch} />
            <Route exact path="/" component={AllFood} />
            <Route path="*" component={PageNotFound} />
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
            <Route path="/search/:query" component={ProductSearch} />
            <Route exact path="/ordered" component={OrderConfirmation} />
            <Route component={PageNotFound} />
          </Switch>
        )}
      </div>
    );
  }
}
export const PageNotFound = () => {
  return (
    <div id="pageNotFound">
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5775a14d-847c-43f8-bbb7-aca998ed7629/db1ole9-d463029b-cac2-4ef0-90f3-61476ca1dda5.jpg/v1/fill/w_1600,h_900,q_75,strp/derpy_magic_link___legend_of_zelda_by_okamihato_db1ole9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNTc3NWExNGQtODQ3Yy00M2Y4LWJiYjctYWNhOTk4ZWQ3NjI5XC9kYjFvbGU5LWQ0NjMwMjliLWNhYzItNGVmMC05MGYzLTYxNDc2Y2ExZGRhNS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uhenTkp9BTy9NA24mjqsVxm8dLUJpg7OCKWt1EjDQbc"></img>
      <h1>(404) Page Not Found</h1>
    </div>
  );
};

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
