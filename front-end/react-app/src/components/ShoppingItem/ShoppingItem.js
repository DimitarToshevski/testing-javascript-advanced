import React from "react";

import "./ShoppingItem.css";

const ShoppingItem = ({ name, quantity }) => (
  <li className="shopping-item">{`Product: ${name}, Quantity: ${quantity}`}</li>
);

export default ShoppingItem;
