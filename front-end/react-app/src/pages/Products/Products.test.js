import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Redirect as MockRedirect } from "react-router-dom";

import { renderWithReduxAndRouter } from "setupTests";
import rootReducer from "store/reducers";
import paths from "paths";
import {
  getProducts as mockGetProducts,
  addProduct as mockAddProduct,
  deleteProduct as mockDeleteProduct,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS
} from "store/actions/productActions";
import { logout as mockLogout, LOGOUT } from "store/actions/authActions";
import Products from "./Products";

jest.mock("react-router-dom", () => ({
  Redirect: jest.fn(() => null)
}));

jest.mock("store/actions/productActions");
jest.mock("store/actions/authActions");

const products = [
  { id: 1, name: "Product 1", quantity: "3" },
  { id: 2, name: "Product 2", quantity: "2" }
];
const productFieldLabel = "Product Name";
const quantityFieldLabel = "Quantity";

const productNameRegex = name => new RegExp(`${name}`, "i");

const renderProductsPageWithToken = () => {
  const store = createStore(
    rootReducer,
    { auth: { token: "secret-token" } },
    applyMiddleware(thunk)
  );

  mockGetProducts.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: products
    });
  });

  return renderWithReduxAndRouter(<Products />, { store });
};

test("should redirect to login page if no auth token is present", () => {
  renderWithReduxAndRouter(<Products />);

  expect(MockRedirect).toHaveBeenCalledWith({ to: paths.login }, {});
});

test("should show list of products if auth token is present", async () => {
  const { getAllByText } = renderProductsPageWithToken();

  expect(mockGetProducts).toHaveBeenCalledTimes(1);
  await wait(() => expect(getAllByText("×").length).toEqual(products.length));
});

test("add button should be disabled if either input field is empty", () => {
  const { getByLabelText, getByTestId } = renderProductsPageWithToken();
  const addButton = getByTestId("addProductBtn");

  expect(addButton).toBeDisabled();

  userEvent.type(getByLabelText(productFieldLabel), "New Product");
  userEvent.type(getByLabelText(quantityFieldLabel), "3");

  expect(addButton).toBeEnabled();
});

test("should logout user", () => {
  const { getByText, store } = renderProductsPageWithToken();
  mockLogout.mockImplementation(() => () => {
    store.dispatch({
      type: LOGOUT
    });
  });

  userEvent.click(getByText("Logout"));

  expect(mockLogout).toHaveBeenCalled();
  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(MockRedirect).toHaveBeenCalledWith({ to: paths.login }, {});
});

test("should add product", async () => {
  const newProduct = {
    name: "Product 3",
    quantity: "2"
  };

  const {
    getByLabelText,
    getByText,
    getByTestId,
    store
  } = renderProductsPageWithToken();
  mockAddProduct.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: { id: 3, ...newProduct }
    });
  });

  const addButton = getByTestId("addProductBtn");
  const productName = getByLabelText(productFieldLabel);
  const quantity = getByLabelText(quantityFieldLabel);
  expect(addButton).toBeDisabled();

  userEvent.type(productName, newProduct.name);
  userEvent.type(quantity, newProduct.quantity);
  userEvent.click(addButton);

  expect(mockAddProduct).toHaveBeenCalledWith(newProduct);
  expect(mockAddProduct).toHaveBeenCalledTimes(1);

  expect(productName.value).toEqual("");
  expect(quantity.value).toEqual("");

  await wait(() =>
    expect(getByText(productNameRegex(newProduct.name))).toBeInTheDocument()
  );
});

test("should delete product", async () => {
  const productToDelete = products[1];
  const { getByText, queryByText, store } = renderProductsPageWithToken();
  mockDeleteProduct.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productToDelete.id
    });
  });

  await wait(() => {
    userEvent.click(
      getByText(productNameRegex(productToDelete.name)).nextSibling
    );
  });

  expect(mockDeleteProduct).toHaveBeenCalledWith(productToDelete.id);
  expect(mockDeleteProduct).toHaveBeenCalledTimes(1);

  await wait(() =>
    expect(queryByText(productNameRegex(productToDelete.name))).toBeNull()
  );
});
