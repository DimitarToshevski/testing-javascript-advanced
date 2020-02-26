import React, { useState } from 'react';

import InputField from './components/InputField/InputField';
import Button from './components/Button/Button';
import ShoppingList from './components/ShoppingList/ShoppingList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, text: 'Product: Milk, Quantity: 1' },
  ]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addProduct = () => {
    const lastItem = products[products.length - 1];

    setProducts([
      ...products,
      {
        id: lastItem.id + 1,
        text: `Product: ${productName}, Quantity: ${quantity}`,
      },
    ]);

    setProductName('');
    setQuantity('');
  };

  return (
    <>
      <section className="control-panel">
        <InputField
          name="name"
          label="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />
        <InputField
          name="quantity"
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />

        <Button
          text="Add Product"
          onClick={addProduct}
          isDisabled={productName === '' || quantity === ''}
        />
      </section>

      <hr />

      <ShoppingList items={products} />
    </>
  );
};

export default App;
