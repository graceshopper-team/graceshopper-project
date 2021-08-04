'use strict';

const {
  db,
  models: { User, Product, Cart },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Apple',
      description:
        'A common fruit found on trees all around Hyrule. Eat it fresh, or cook it to increase its effect.',
      category: 'Fruit',
      hearts: 0.5,
      inventory: 50,
      cost: 3,
      imageUrl: 'https://www.zeldadungeon.net/wiki/images/c/c3/Apple-botw.png',
    }),
    Product.create({
      name: 'Big Hearty Radish',
      description:
        "This hearty radish has grown much larger than the average radish. It's rich in analeptic compounds that, when cooked into a dish, temporarily increase your maximum hearts",
      category: 'Vegetable',
      hearts: 4,
      inventory: 0,
      cost: 10,
      imageUrl:
        'https://www.zeldadungeon.net/wiki/images/0/0c/Big_Hearty_Radish.png',
    }),
    Product.create({
      name: 'Raw Meat',
      description:
        'Meat obtained from animals in plains and forests. You can eat it raw, but cooking it will make it more delicious and nutritious.',
      category: 'Meat',
      hearts: 1,
      inventory: 99,
      cost: 5,
      imageUrl: 'https://www.zeldadungeon.net/wiki/images/e/e9/Raw_Meat.png',
    }),
  ]);

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);

  // Creating Carts
  const carts = await Promise.all([
    Cart.create({ contents: ['Scott', 'Vaughn'] }),
    Cart.create({ contents: ['Garrison', 'John'] }),
  ]);

  // Associate users to carts
  await carts[0].setUser(users[0]);
  await carts[1].setUser(users[1]);

  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded successfully`);

  // Test idea (THAT WORKS!):
  // We can push items to our cart by doing the below command
  // NOTE: This will be utilized in our express routes
  carts[0] = await carts[0].update({
    contents: [...carts[0].contents, 'bananas'],
  });

  console.log('Contents, what am i?', carts[0].contents);

  console.log(`updated successfully?!?`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products: {
      Apple: products[0],
      'Big-Hearty-Radish': products[1],
      'Raw-Meat': products[2],
    },
    carts: {
      cart1: carts[0],
      cart2: carts[1],
    },
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
