import React, { useState } from "react";

import {
  Item,
  ItemText,
  ButtonContainer,
  EditButton,
  DeleteButton
} from "./ShoppingItemStyles";

const ShoppingItem = ({ id, name, quantity, isEdited, onDelete, onEdit }) => {
  const [isComplete, setComplete] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const handleDelete = e => {
    e.stopPropagation();

    onDelete(id);
  };

  const handleEdit = e => {
    e.stopPropagation();

    onEdit({ id, name, quantity });
  };

  return (
    <Item
      data-testid={`product-${id}`}
      onClick={() => setComplete(!isComplete)}
      onMouseEnter={() => setButtonsVisible(true)}
      onMouseLeave={() => setButtonsVisible(false)}
    >
      <ItemText
        completed={isComplete}
      >{`Product: ${name}, Quantity: ${quantity}`}</ItemText>
      {buttonsVisible && (
        <ButtonContainer>
          <EditButton
            data-testid={`product-${id}-edit-btn`}
            onClick={handleEdit}
          >
            Edit
          </EditButton>
          <DeleteButton
            data-testid={`product-${id}-delete-btn`}
            disabled={isEdited}
            onClick={handleDelete}
          >
            ×
          </DeleteButton>
        </ButtonContainer>
      )}
    </Item>
  );
};
export default ShoppingItem;
