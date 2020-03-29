import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import paths from "paths";
import { useFormState } from "hooks/useFormState";
import { logout } from "store/actions/authActions";
import {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct
} from "store/actions/productActions";
import InputField from "components/InputField/InputField";
import Button from "components/Button/Button";
import ShoppingList from "components/ShoppingList/ShoppingList";

import { FormWrapper, ProductSection, ButtonWrapper } from "./ProductsStyles";

const Products = ({ token, products, dispatch }) => {
  const { formState, handleChange, resetForm, updateFormState } = useFormState({
    name: "",
    quantity: ""
  });
  const { name, quantity } = formState;
  const [editedItemId, setEditedItemId] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(getProducts());
    }
  }, [dispatch, token]);

  const handleAdd = () => {
    const newProduct = {
      name,
      quantity
    };

    dispatch(addProduct(newProduct));

    resetForm();
  };

  const handleDelete = productId => dispatch(deleteProduct(productId));

  const enableEditMode = product => {
    setEditedItemId(product.id);

    updateFormState(product);
  };

  const handleEdit = () => {
    const editedProduct = {
      id: editedItemId,
      name,
      quantity
    };

    dispatch(editProduct(editedProduct));

    resetForm();
    setEditedItemId(null);
  };

  const handleLogout = () => dispatch(logout());

  if (!token) {
    return <Redirect to={paths.login} />;
  }

  return (
    <>
      <FormWrapper>
        <ProductSection>
          <InputField
            name="name"
            label="Product Name"
            value={name}
            onChange={handleChange}
          />
          <InputField
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleChange}
          />
          <Button
            data-testid="productBtn"
            text={editedItemId ? "Save Changes" : "Add Product"}
            type="primary"
            onClick={editedItemId ? handleEdit : handleAdd}
            isDisabled={name === "" || quantity === ""}
          />
        </ProductSection>
        <ButtonWrapper>
          <Button text="Logout" onClick={handleLogout} />
        </ButtonWrapper>
      </FormWrapper>

      <hr />

      <ShoppingList
        items={products}
        editedItemId={editedItemId}
        onItemDelete={handleDelete}
        onItemEdit={enableEditMode}
      />
    </>
  );
};

const mapStateToProps = ({ auth, products }) => ({
  token: auth.token,
  products: products.data
});

export default connect(mapStateToProps)(Products);
