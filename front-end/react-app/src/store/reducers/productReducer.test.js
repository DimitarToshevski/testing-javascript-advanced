import productReducer, { initialState } from "./productReducer";
import {
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from "../actions/productActions";

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" }
];

test("product reducer should return initial state", () => {
  const state = productReducer();

  expect(state).toEqual(initialState);
});

test("product reducer should store product data", () => {
  const state = productReducer(initialState, {
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  });

  expect(state).toEqual({ data: products });
});

test("product reducer should add new product", () => {
  const newProduct = { id: 3, name: "Product 3" };

  const state = productReducer(
    { data: products },
    {
      type: ADD_PRODUCT_SUCCESS,
      payload: newProduct
    }
  );

  expect(state).toEqual({ data: [...products, newProduct] });
});

test("product reducer should remove product", () => {
  const productId = products[0].id;

  const state = productReducer(
    { data: products },
    {
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId
    }
  );

  expect(state).toEqual({ data: products.filter(p => p.id !== productId) });
});
