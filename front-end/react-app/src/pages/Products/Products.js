import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import ApiService from "services/ApiService";
import InputField from "components/InputField/InputField";
import Button from "components/Button/Button";
import ShoppingList from "components/ShoppingList/ShoppingList";

import { FormWrapper, ProductSection, ButtonWrapper } from "./ProductsStyles";

const Products = () => {
  const [authToken, , logout] = useAuthToken();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ApiService.get("products", authToken);

      setProducts(res);
    };

    fetchProducts();
  }, [authToken]);

  const addProduct = async () => {
    const newProduct = {
      name: productName,
      quantity
    };

    const res = await ApiService.post("products", { ...newProduct }, authToken);

    setProducts([...products, { id: res.data.id, ...newProduct }]);

    setProductName("");
    setQuantity("");
  };

  const deleteProduct = async productId => {
    await ApiService.remove(`products/${productId}`, authToken);

    setProducts(products.filter(item => item.id !== productId));
  };

  if (!authToken) {
    return <Redirect to={paths.login} />;
  }

  return (
    <>
      <FormWrapper>
        <ProductSection>
          <InputField
            name="name"
            label="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
          <InputField
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
          <Button
            text="Add Product"
            type="primary"
            onClick={addProduct}
            isDisabled={productName === "" || quantity === ""}
          />
        </ProductSection>
        <ButtonWrapper>
          <Button text="Logout" onClick={logout} />
        </ButtonWrapper>
      </FormWrapper>

      <hr />

      <ShoppingList items={products} onItemDelete={deleteProduct} />
    </>
  );
};

export default Products;
