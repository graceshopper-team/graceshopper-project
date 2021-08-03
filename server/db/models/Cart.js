const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  contents: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Cart;
