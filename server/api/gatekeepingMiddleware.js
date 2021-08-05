const User = require('../db/models/User');

const requireToken = async (req, res, next) => {
  console.log('checking token');
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  console.log('checking admin');
  if (!req.user.isAdmin) {
    return res.status(403).send('Permission Denied');
  } else {
    console.log('admiin aproved');
    next(); //i am an admin
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
