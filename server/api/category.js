const router = require('express').Router();
const {
  models: { Category},
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ['name']
    })
    res.json(categories)

  }
  catch(error){
    next(error)
  }
})

