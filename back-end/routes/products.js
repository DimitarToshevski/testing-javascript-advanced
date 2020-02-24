const express = require('express');
const router = express.Router();

const products = [{ name: 'Milk', quantity: 1 }];

router.get('/api/products', (req, res, next) => {
  res.json(products);
});

router.post('/api/products', (req, res, next) => {
  products.push(req.body);
  res.status(200).json({
    message: 'Product added successfully!'
  });
});

module.exports = router;
