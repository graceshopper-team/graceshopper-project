const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  hearts: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,

    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.zeldadungeon.net/wiki/images/d/df/Wood.png',
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Product;
