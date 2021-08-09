const router = require('express').Router();
const { Sequelize } = require('sequelize');
const {
  models: { Product, Category },
} = require('../db');
module.exports = router;

const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

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
      if (products) res.json(products);
      else {
        const error = new Error('Error Loading Products');
        res.sendStatus(404);
        next(error);
      }
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
      if (products) res.json(products);
      else {
        const error = new Error('Error Loading Products');
        res.sendStatus(404);
        next(error);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get('/search', async (req, res, next) => {
  const query = req.query.filter.toLowerCase().trim() || '';
  try {
    const products = await Product.findAll({
      where: {
        name: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          'LIKE',
          '%' + query + '%'
        ),
      },
      attributes: ['id', 'name', 'cost', 'imageUrl', 'inventory', 'hearts'],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    });
    if (product) res.json(product);
    else {
      const error = new Error('No Product With That ID Found');
      res.sendStatus(404);
      next(error);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.productId);
    if (productToDelete) {
      await productToDelete.destroy();
      res.sendStatus(204);
    } else {
      const error = new Error('No Product With That ID Found');
      res.sendStatus(404);
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.productId);
    if (product) res.json(await product.update(req.body));
    else {
      const error = new Error('No Product With That ID Found');
      res.sendStatus(404);
      next(error);
    }
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
