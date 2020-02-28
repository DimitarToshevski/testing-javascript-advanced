import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import ApiService from "services/ApiService";
import InputField from "components/InputField/InputField";
import Button from "components/Button/Button";
import ShoppingList from "components/ShoppingList/ShoppingList";

import "./Products.css";

const Products = () => {
  const [authToken] = useAuthToken();
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

  const addProduct = () => {
    const lastItem = products[products.length - 1];

    setProducts([
      ...products,
      {
        id: lastItem.id + 1,
        text: `Product: ${productName}, Quantity: ${quantity}`
      }
    ]);

    setProductName("");
    setQuantity("");
  };

  if (!authToken) {
    return <Redirect to={paths.login} />;
  }

  return (
    <>
      <section className="control-panel">
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
          onClick={addProduct}
          isDisabled={productName === "" || quantity === ""}
        />
      </section>

      <hr />

      <ShoppingList items={products} />
    </>
  );
};

export default Products;
