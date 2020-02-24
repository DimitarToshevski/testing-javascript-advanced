const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, 'secret_key_to_read_the_token');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized!' });
  }
};
