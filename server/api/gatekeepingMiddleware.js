const User = require('../db/models/User');

const requireToken = async (req, res, next) => {
  try {
    // console.log('WHAT IS REQ? ', req);
    const token = req.headers.authorization || req.body.headers.authorization;
    console.log('token: ', token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Permission Denied');
  } else {
    next(); //i am an admin
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
