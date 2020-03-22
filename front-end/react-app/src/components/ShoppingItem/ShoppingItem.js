import React, { useState } from "react";

import { Item, ItemText, DeleteButton } from "./ShoppingItemStyles";

const ShoppingItem = ({ id, name, quantity, onDelete }) => {
  const [isComplete, setComplete] = useState(false);

  const handleDelete = e => {
    e.stopPropagation();

    onDelete(id);
  };

  return (
    <Item onClick={() => setComplete(!isComplete)}>
      <ItemText
        completed={isComplete}
      >{`Product: ${name}, Quantity: ${quantity}`}</ItemText>
      <DeleteButton onClick={handleDelete}>×</DeleteButton>
    </Item>
  );
};
export default ShoppingItem;
