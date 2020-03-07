const express = require('express');
const checkAuth = require('../middleware/auth');
const { generateId } = require('../utils/helpers');

const router = express.Router();

let products = [{ id: generateId(), name: 'Milk', quantity: 1 }];

router.get('', checkAuth, (req, res) => {
  res.json(products);
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

module.exports = router;
