const express = require('express');
const checkAuth = require('../middleware/auth');
const { generateId } = require('../utils/helpers');

const router = express.Router();

const initialState = [{ id: generateId(), name: 'Milk', quantity: 1 }];
let products = [...initialState];

router.get('', checkAuth, (req, res) => {
  res.json({
    message: 'Products fetched successfully!',
    data: products
  });
});

router.post('', checkAuth, (req, res) => {
  const newItemId = generateId();

  products.push({ id: newItemId, ...req.body });

  res.status(200).json({
    message: 'Product added successfully!',
    data: { id: newItemId }
  });
});

router.delete('/:productId', checkAuth, (req, res) => {
  products = products.filter(item => item.id !== req.params.productId);

  res.status(200).json({
    message: 'Product deleted successfully!'
  });
});

router.post('/reset', (req, res) => {
  products = [...initialState];

  res.status(200).json({
    message: 'Database reset successfully!'
  });
});

module.exports = router;
