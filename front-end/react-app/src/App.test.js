import React from "react";

import { renderWithReduxAndRouter } from "setupTests";
import paths from "paths";
import { getProducts as mockGetProducts } from "store/actions/productActions";
import App from "./App";

jest.mock("store/actions/productActions");

test("should render Login page", () => {
  const { history, getByTestId } = renderWithReduxAndRouter(<App />, {
    initialRoute: paths.login
  });

  expect(history.location.pathname).toEqual(paths.login);
  expect(getByTestId("loginBtn")).toBeInTheDocument();
});

test("should render Products page", () => {
  mockGetProducts.mockImplementation(() => () => {});
  const { history, getByTestId } = renderWithReduxAndRouter(<App />, {
    initialRoute: paths.products,
    initialState: { auth: { token: "secret-token" } }
  });

  expect(history.location.pathname).toEqual(paths.products);
  expect(getByTestId("productBtn")).toBeInTheDocument();
});
