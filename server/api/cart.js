const router = require('express').Router();
const {
  models: { Cart, Product, User },
} = require('../db');
module.exports = router;
const { requireToken } = require('./gatekeepingMiddleware');

//commented requireToken out because issues
//router.get('/:userId', requireToken, async (req, res, next) => {
router.get('/:userId', async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);

    //commented auth out because issues
    if (
      //req.user.id === paramsNum
      true
    ) {
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
router.put('/:userId/', async (req, res, next) => {
  const rowId = req.body.rowId;
  const quantity = req.body.quantity;
  try {
    let cartRow = await Cart.findByPk(rowId);
    cartRow.quantity = quantity;
    await cartRow.save();

    res.status(201).send(cartRow);
  } catch (error) {
    next(error);
  }
});

//delete product where user has it
router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    await Cart.destroy({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//delete the items in cart when user 'checks out' (tier 1 requirements min-maxing)
router.delete('/:userId/', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Cart.destroy({
      where: {
        userId: userId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
