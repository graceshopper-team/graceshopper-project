import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewUserCartThunk } from '../../store/cart';

class HandleAnonCart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { history, newUserCart, userId } = this.props;
    
    newUserCart(userId);
    history.push('/products');
  }

  render() {
    return (
      <span></span>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    newUserCart: (userId) => dispatch(addNewUserCartThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleAnonCart);
