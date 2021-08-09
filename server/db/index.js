//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Category = require('./models/Category');

//associations could go here!

// JOE CR: Let's start with how we are thinking about the Cart model.

// User to Cart is 1-->Many
User.hasMany(Cart);
Cart.belongsTo(User);

// Product to Cart is 1-->Many
Product.hasMany(Cart);
Cart.belongsTo(Product);

// Category to Product is 1-->Many
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Category,
  },
};
