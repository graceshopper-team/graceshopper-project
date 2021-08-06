const router = require('express').Router();
const {
  models: { Cart, Product, User },
} = require('../db');
module.exports = router;
const { requireToken } = require('./gatekeepingMiddleware');

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const paramsNum = parseInt(req.params.userId, 10);
    if (req.user.id === paramsNum) {
      const carts = await Cart.findAll({
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
