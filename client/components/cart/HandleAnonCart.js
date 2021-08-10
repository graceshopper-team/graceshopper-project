import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewUserCartThunk } from '../../store/cart';

class HandleAnonCart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { history, newUserCart, userId } = this.props;
    console.log('what is this.props? ', this.props);
    // this.props.newUserCart(this.props.userId);
    newUserCart(userId);

    // if(history.location.state.from == "login"){
    //   existingUserCart(userId);
    // } else if(history.location.state.from == "signup"){
    //   newUserCart(userId);
    // }
    history.push('/products');
  }

  render() {
    return (
      <div>
        <h1>Connecting Local cart with your new Account</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    newUserCart: (userId) => dispatch(addNewUserCartThunk(userId)),
    // existingUserCart: (userId) => dispatch(updateUserCartThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleAnonCart);
