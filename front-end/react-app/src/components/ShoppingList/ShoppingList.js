import React from "react";

import ShoppingItem from "components/ShoppingItem/ShoppingItem";
import { ListHeader, ListContainer } from "./ShoppingListStyles";

const ShoppingList = ({ items, onItemDelete }) => (
  <section>
    <ListHeader>Shopping List</ListHeader>
    <ListContainer>
      {items.map(item => (
        <ShoppingItem key={item.id} onDelete={onItemDelete} {...item} />
      ))}
    </ListContainer>
  </section>
);

export default ShoppingList;
