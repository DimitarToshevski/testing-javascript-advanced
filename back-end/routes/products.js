const express = require('express');
const checkAuth = require('../middleware/auth');
const router = express.Router();

const products = [{ name: 'Milk', quantity: 1 }];

router.get('', checkAuth, (req, res, next) => {
  res.json(products);
});

router.post('', checkAuth, (req, res, next) => {
  products.push(req.body);
  res.status(200).json({
    message: 'Product added successfully!'
  });
});

module.exports = router;
