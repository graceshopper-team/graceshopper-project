'use strict';

const {
  db,
  models: { User, Product, Cart, Category },
} = require('../server/db');

const { userSeed, productSeed, categorySeed, cartSeed } = require('./seedData');

// create all the objects to make Products here & add to array
// so we can loop through them using Product.create
//
// find more materials using this link:
// https://www.zeldadungeon.net/wiki/Breath_of_the_Wild_Materials

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all(
    userSeed.map((user) => {
      return User.create(user);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Products
  const products = await Promise.all(
    productSeed.map((product) => {
      return Product.create(product);
    })
  );

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);

  // Creating Carts:
  // changed names added to carts to represent real items so we can use it for
  // or cart total logic tests
  // const carts = await Promise.all([
  //   Cart.create({ contents: ['Apple', 'Apple', 'Hearty Truffle', 'Raw Meat'] }),
  //   Cart.create({
  //     contents: [
  //       'Fortified Pumpkin',
  //       'Hearty Bass',
  //       'Stealthfin Trout',
  //       'Staminoka Bass',
  //     ],
  //   }),
  // ]);

  // Creating Categories
  const categories = await Promise.all(
    categorySeed.map((category) => {
      return Category.create(category);
    })
  );

  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded successfully`);

  // Associate products to categories
  // Note: we know that products are sorted by category
  for (let i = 0; i < products.length; i++) {
    if (i <= 5) {
      // Fruits
      await products[i].setCategory(categories[0]);
    } else if (i <= 10) {
      // Mushroom
      await products[i].setCategory(categories[1]);
    } else if (i <= 16) {
      // Vegetable
      await products[i].setCategory(categories[2]);
    } else if (i <= 22) {
      // Meat
      await products[i].setCategory(categories[3]);
    } else {
      // Fish
      await products[i].setCategory(categories[4]);
    }
  }

  console.log(`associated products to categories successfully`);

  // Creating Carts
  const carts = await Promise.all(
    cartSeed.map((cart) => {
      return Cart.create(cart);
    })
  );

  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded successfully`);

  // Associate a product and user to each cart.
  // stores added productId's to array so duplicate product carts are not added to same user-cart
  let alreadyAddedProducts = [];
  for (let j = 0; j < carts.length; j++) {
    // Create random product idx
    let randomProductIdx = Math.floor(Math.random() * products.length);
    //make sure it hasn't been used before
    while (alreadyAddedProducts.includes(randomProductIdx)) {
      randomProductIdx = Math.floor(Math.random() * products.length);
    }
    //when it is confirmed to not have been used before, it is added to alreadyAddedProducts
    alreadyAddedProducts.push(randomProductIdx);

    // Create random user idx
    let randomUserIdx = Math.floor(Math.random() * users.length);
    await carts[j].setProduct(products[randomProductIdx]);
    await carts[j].setUser(users[randomUserIdx]);
  }

  console.log(`associated products and users to carts successfully`);

  // Test idea (THAT WORKS!):
  // We can push items to our cart by doing the below command
  // NOTE: This will be utilized in our express routes
  // carts[0] = await carts[0].update({
  //   contents: [...carts[0].contents, 'Mighty Porgy'],
  // });

  // formatted like the existing values in statement was originally
  // i.e. attribute: value => product.name: product
  // then it is all returned as a single object, products.
  let productArrayToObj = {};
  products.forEach((product) => {
    productArrayToObj[product.name] = product;
  });
  let userArrayToObj = {};
  users.forEach((user) => {
    userArrayToObj[user.name] = user;
  });
  let cartArrayToObj = {};
  carts.forEach((cart, idx) => {
    cartArrayToObj[`cart ${idx}`] = cart;
  });
  let categoryArrayToObj = {};
  categories.forEach((category) => {
    categoryArrayToObj[category.name] = category;
  });

  return {
    users: userArrayToObj,
    products: productArrayToObj,
    carts: cartArrayToObj,
    categories: categoryArrayToObj,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
