import React from "react";

import ShoppingItem from "components/ShoppingItem/ShoppingItem";
import { ListHeader, ListContainer } from "./ShoppingListStyles";

const ShoppingList = ({ items }) => (
  <section>
    <ListHeader>Shopping List</ListHeader>
    <ListContainer>
      {items.map((item, index) => (
        <ShoppingItem key={index} name={item.name} quantity={item.quantity} />
      ))}
    </ListContainer>
  </section>
);

export default ShoppingList;
