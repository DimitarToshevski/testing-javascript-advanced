import React from "react";

import ShoppingItem from "components/ShoppingItem/ShoppingItem";
import { ListHeader, ListContainer } from "./ShoppingListStyles";

const ShoppingList = ({ items, editedItemId, onItemDelete, onItemEdit }) => (
  <section>
    <ListHeader>Shopping List</ListHeader>
    <ListContainer>
      {items.map(item => (
        <ShoppingItem
          key={item.id}
          isEdited={editedItemId === item.id}
          onDelete={onItemDelete}
          onEdit={onItemEdit}
          {...item}
        />
      ))}
    </ListContainer>
  </section>
);

export default ShoppingList;
