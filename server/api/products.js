const router = require('express').Router();
const {
  models: { Product, Category },
} = require('../db');
module.exports = router;

const { isAdmin, requireToken } = require('./gateKeepingMiddleware');

router.get('/', async (req, res, next) => {
  try {
    if (req.query.filter === 'none') {
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ['name'],
        },
        attributes: ['id', 'name', 'cost', 'imageUrl', 'inventory', 'hearts'],
      });
      res.json(products);
    }
    //uses filter in query to only get foods with matching category
    else {
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ['name'],
          where: {
            name: req.query.filter,
          },
        },
        attributes: ['id', 'name', 'cost', 'imageUrl', 'inventory', 'hearts'],
      });
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Category,
          attributes: ['name'],
        }
      ]
    });
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
