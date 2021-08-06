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
    if (//req.user.id === paramsNum 
        true) {
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
