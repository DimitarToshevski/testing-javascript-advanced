import React from "react";
import { wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Redirect as MockRedirect } from "react-router-dom";

import { renderWithRedux } from "setupTests";
import paths from "paths";
import {
  loginUser as mockLoginUser,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "store/actions/authActions";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  Redirect: jest.fn(() => null),
}));

jest.mock("store/actions/authActions");

const usernameFieldLabel = "Username";
const passwordFieldLabel = "Password";

test("should redirect to Products page if auth token exists", () => {
  renderWithRedux(<Login />, {
    initialState: { auth: { token: "secret-token" } },
  });

  expect(MockRedirect).toHaveBeenCalledWith({ to: paths.products }, {});
});

test("login button should be disabled if either input field is empty", () => {
  const { getByLabelText, getByTestId } = renderWithRedux(<Login />);
  const loginButton = getByTestId("loginBtn");
  expect(loginButton).toBeDisabled();

  userEvent.type(getByLabelText(usernameFieldLabel), "user");
  userEvent.type(getByLabelText(passwordFieldLabel), "pass");

  expect(loginButton).toBeEnabled();
});

test("should redirect to Products page if login is successful", async () => {
  const username = "test";
  const password = "test";

  const { getByLabelText, getByTestId, store } = renderWithRedux(<Login />);

  mockLoginUser.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: "secret-token",
    });
  });

  userEvent.type(getByLabelText(usernameFieldLabel), username);
  userEvent.type(getByLabelText(passwordFieldLabel), password);
  userEvent.click(getByTestId("loginBtn"));

  expect(mockLoginUser).toHaveBeenCalledWith(username, password);
  expect(mockLoginUser).toHaveBeenCalledTimes(1);

  await wait(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: paths.products }, {})
  );
});

test("should show error message if login is unsuccessful", async () => {
  const error = "Incorrect username or password";
  const { getByLabelText, findByText, getByTestId, store } = renderWithRedux(
    <Login />
  );

  mockLoginUser.mockImplementation(() => async () => {
    await Promise.resolve();

    store.dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
  });

  userEvent.type(getByLabelText(usernameFieldLabel), "test");
  userEvent.type(getByLabelText(passwordFieldLabel), "incorrect password");
  userEvent.click(getByTestId("loginBtn"));

  expect(await findByText(error)).toBeInTheDocument();
});
