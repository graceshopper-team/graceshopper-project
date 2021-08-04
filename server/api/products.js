const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id', 'username']
      attributes: ['id', 'name', 'cost', 'imageUrl', 'inventory'],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }

});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err)
  }
})

