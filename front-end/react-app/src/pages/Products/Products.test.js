import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Redirect as MockRedirect } from "react-router-dom";

import { renderWithRedux } from "setupTests";
import rootReducer from "store/reducers";
import paths from "paths";
import {
  getProducts as mockGetProducts,
  addProduct as mockAddProduct,
  deleteProduct as mockDeleteProduct,
  editProduct as mockEditProduct,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
} from "store/actions/productActions";
import { logout as mockLogout, LOGOUT } from "store/actions/authActions";
import Products from "./Products";

jest.mock("react-router-dom", () => ({
  Redirect: jest.fn(() => null),
}));

jest.mock("store/actions/productActions");
jest.mock("store/actions/authActions");

const products = [
  { id: 1, name: "Product 1", quantity: "3" },
  { id: 2, name: "Product 2", quantity: "2" },
];
const productFieldLabel = "Product Name";
const quantityFieldLabel = "Quantity";

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
      payload: products,
    });
  });

  return renderWithRedux(<Products />, { store });
};

test("should redirect to login page if no auth token is present", () => {
  renderWithRedux(<Products />);

  expect(MockRedirect).toHaveBeenCalledWith({ to: paths.login }, {});
});

test("should show list of products if auth token is present", async () => {
  const { getAllByRole } = renderProductsPageWithToken();

  expect(mockGetProducts).toHaveBeenCalledTimes(1);
  await wait(() =>
    expect(getAllByRole("listitem").length).toEqual(products.length)
  );
});

test("add button should be disabled if either input field is empty", () => {
  const { getByLabelText, getByTestId } = renderProductsPageWithToken();
  const addButton = getByTestId("productBtn");

  expect(addButton).toBeDisabled();

  userEvent.type(getByLabelText(productFieldLabel), "New Product");
  userEvent.type(getByLabelText(quantityFieldLabel), "3");

  expect(addButton).toBeEnabled();
});

test("should logout user", () => {
  const { getByText, store } = renderProductsPageWithToken();
  mockLogout.mockImplementation(() => () => {
    store.dispatch({
      type: LOGOUT,
    });
  });

  userEvent.click(getByText("Logout"));

  expect(mockLogout).toHaveBeenCalled();
  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(MockRedirect).toHaveBeenCalledWith({ to: paths.login }, {});
});

test("should add product", async () => {
  const newProductId = 3;
  const newProduct = {
    name: "Product 3",
    quantity: "2",
  };

  const { getByLabelText, getByTestId, store } = renderProductsPageWithToken();
  mockAddProduct.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: { id: newProductId, ...newProduct },
    });
  });

  const addButton = getByTestId("productBtn");
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
    expect(getByTestId(`product-${newProductId}`)).toBeInTheDocument()
  );
});

test("should delete product", async () => {
  const productToDelete = products[1];
  const productSelector = `product-${productToDelete.id}`;
  const { getByTestId, queryByTestId, store } = renderProductsPageWithToken();
  mockDeleteProduct.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productToDelete.id,
    });
  });

  await wait(() => {
    fireEvent.mouseEnter(getByTestId(productSelector));
  });

  userEvent.click(getByTestId(`${productSelector}-delete-btn`));

  expect(mockDeleteProduct).toHaveBeenCalledWith(productToDelete.id);
  expect(mockDeleteProduct).toHaveBeenCalledTimes(1);

  await wait(() => expect(queryByTestId(productSelector)).toBeNull());
});

test("should edit existing product", async () => {
  const productToEdit = products[1];
  const productSelector = `product-${productToEdit.id}`;
  const editedProduct = {
    ...productToEdit,
    name: `${productToEdit.name} Name`,
    quantity: "5",
  };

  const {
    getByLabelText,
    getByTestId,
    queryByTestId,
    store,
  } = renderProductsPageWithToken();
  mockEditProduct.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: editedProduct,
    });
  });

  await wait(() => {
    fireEvent.mouseEnter(getByTestId(productSelector));
  });

  const productItem = getByTestId(productSelector);
  const productName = getByLabelText(productFieldLabel);
  const quantity = getByLabelText(quantityFieldLabel);
  const productButton = getByTestId("productBtn");
  const editButtonSelector = `${productSelector}-edit-btn`;
  const deleteButtonSelector = `${productSelector}-delete-btn`;

  userEvent.click(getByTestId(editButtonSelector));

  expect(getByTestId(deleteButtonSelector)).toBeDisabled();
  expect(productName.value).toEqual(productToEdit.name);
  expect(quantity.value).toEqual(productToEdit.quantity);
  expect(productButton).toHaveTextContent("Save Changes");

  fireEvent.mouseLeave(productItem);

  expect(queryByTestId(editButtonSelector)).toBeNull();
  expect(queryByTestId(deleteButtonSelector)).toBeNull();

  userEvent.type(productName, editedProduct.name);
  userEvent.type(quantity, editedProduct.quantity);
  userEvent.click(productButton);

  expect(mockEditProduct).toHaveBeenCalledWith(editedProduct);
  expect(mockEditProduct).toHaveBeenCalledTimes(1);
  expect(productName.value).toEqual("");
  expect(quantity.value).toEqual("");
  expect(productButton).toHaveTextContent("Add Product");

  await wait(() => {
    expect(productItem).toHaveTextContent(editedProduct.name);
  });

  expect(productItem).toHaveTextContent(editedProduct.quantity);

  fireEvent.mouseEnter(productItem);

  expect(getByTestId(deleteButtonSelector)).toBeEnabled();
});
