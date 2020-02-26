import React from 'react';

import ShoppingItem from '../ShoppingItem/ShoppingItem';
import './ShoppingList.css';

const ShoppingList = ({ items }) => (
  <section>
    <h3>Shopping List</h3>
    <ul className="shopping-list">
      {items.map(item => (
        <ShoppingItem key={item.id} text={item.text} />
      ))}
    </ul>
  </section>
);

export default ShoppingList;
