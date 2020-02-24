const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('', (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'test' && password === 'test') {
    const token = jwt.sign(
      {
        username
      },
      'secret_key_to_read_the_token',
      { expiresIn: '10h' }
    );

    return res.status(200).json({
      token,
      message: 'Successfully logged in!'
    });
  }

  res.status(401).json({
    message: 'Authentication failed. Invalid credentials.'
  });
});

module.exports = router;
