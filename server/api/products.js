const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;
const { isAdmin, requireToken } = require('./gateKeepingMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
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
    next(err);
  }
});

router.delete('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.productId);
    await productToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.productId);
    res.json(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});
