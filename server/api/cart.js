const router = require('express').Router();
const {
  models: { Cart, Product, User },
} = require('../db');
module.exports = router;
const { requireToken } = require('./gatekeepingMiddleware');

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) { // Joe CR: I think I was getting an error on this line.
      const carts = await Cart.findAll({
        include: {
          model: Product,
        },
        where: {
          userId: paramsNum,
        },
      });
      res.json(carts);
    } else {
      const error = new Error('access denied');
      res.sendStatus(404);
      next(error);
    }
  } catch (err) {
    next(err);
  }
});

//update quantity of product
router.put('/:userId', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) {
      const rowId = req.body.rowId;
      const quantity = req.body.quantity;
      let cartRow = await Cart.findByPk(rowId);
      cartRow.quantity = quantity;
      await cartRow.save();

      res.status(201).send(cartRow);
    }
  } catch (error) {
    next(error);
  }
});

//delete product where user has it
router.delete('/:userId/:productId', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) {
      const userId = req.params.userId;
      const productId = req.params.productId;
      // Joe CR: Why does update (PUT route) use "rowId" (pk of Cart row), but this uses product+user?
      await Cart.destroy({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

//delete the items in cart when user 'checks out' (tier 1 requirements min-maxing)
router.delete('/:userId/', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) {
      const userId = req.params.userId;
      await Cart.destroy({
        where: {
          userId: userId,
        },
      });
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

//if (user has cart with item in it already) add to that Cart
//else create a new cart using an object w the quantity as its only attribute
//
//then, add the requested item to the cart
//then, assign that cart to the requested user

router.post('/:userId', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) {
      const productId = req.body.productId;
      const quantity = req.body.quantity || 1;
      const userId = req.params.userId;

      let product = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (product) {
        //this exist already in user cart
        product.quantity = product.quantity + quantity;

        await product.save();
        res.sendStatus(201);
      } else {
        //this does not exist in user cart
        const newCartObj = {
          quantity: quantity,
        };
        //create new Cart from model w/ quantity specified
        const newCart = await Cart.create(newCartObj);

        //add association to specified user
        // Joe CR: I believe you already have this as req.user.
        const user = await User.findByPk(userId);
        await newCart.setUser(user);

        //add association to specified product
        const product = await Product.findByPk(productId);
        // Joe CR: Each of these associative methods is a query to your database. 
        // It may be more performant to NOT use the association methods in this case.
        await newCart.setProduct(product);


        //what should we return? what would JPFP do?
        res.sendStatus(201);
      }
    }
  } catch (error) {
    next(error);
  }
});
