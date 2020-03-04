import React from "react";

import { Item } from "./ShoppingItemStyles";

const ShoppingItem = ({ name, quantity }) => (
  <Item>{`Product: ${name}, Quantity: ${quantity}`}</Item>
);

export default ShoppingItem;
