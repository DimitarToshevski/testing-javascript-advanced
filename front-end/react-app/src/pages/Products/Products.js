import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import paths from "paths";
import { useFormState } from "hooks/useFormState";
import { logout } from "store/actions/authActions";
import {
  getProducts,
  addProduct,
  deleteProduct
} from "store/actions/productActions";
import InputField from "components/InputField/InputField";
import Button from "components/Button/Button";
import ShoppingList from "components/ShoppingList/ShoppingList";

import { FormWrapper, ProductSection, ButtonWrapper } from "./ProductsStyles";

const Products = ({ token, products, dispatch }) => {
  const [formState, handleChange, resetForm] = useFormState({
    name: "",
    quantity: ""
  });
  const { name, quantity } = formState;

  useEffect(() => {
    if (token) {
      dispatch(getProducts(token));
    }
  }, [dispatch, token]);

  const handleAdd = async () => {
    const newProduct = {
      name,
      quantity
    };

    dispatch(addProduct(newProduct, token));

    resetForm();
  };

  const handleDelete = async productId =>
    dispatch(deleteProduct(productId, token));

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
            text="Add Product"
            type="primary"
            onClick={handleAdd}
            isDisabled={name === "" || quantity === ""}
          />
        </ProductSection>
        <ButtonWrapper>
          <Button text="Logout" onClick={handleLogout} />
        </ButtonWrapper>
      </FormWrapper>

      <hr />

      <ShoppingList items={products} onItemDelete={handleDelete} />
    </>
  );
};

const mapStateToProps = ({ auth, products }) => ({
  token: auth.token,
  products: products.data
});

export default connect(mapStateToProps)(Products);
