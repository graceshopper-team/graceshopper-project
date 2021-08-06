const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.userId);
    await userToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);
    res.json(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});
