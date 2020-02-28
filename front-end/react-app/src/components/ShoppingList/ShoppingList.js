import React from "react";

import ShoppingItem from "../ShoppingItem/ShoppingItem";
import "./ShoppingList.css";

const ShoppingList = ({ items }) => (
  <section>
    <h3 className="list-heading">Shopping List</h3>
    <ul className="shopping-list">
      {items.map((item, index) => (
        <ShoppingItem key={index} name={item.name} quantity={item.quantity} />
      ))}
    </ul>
  </section>
);

export default ShoppingList;
