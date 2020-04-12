import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import rootReducer from "store/reducers";

export const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    ...options
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { ...render(ui, { wrapper: Wrapper, ...options }), store };
};

export const renderWithReduxAndRouter = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    initialRoute = "/",
    history = createMemoryHistory({ initialEntries: [initialRoute] }),
    ...options
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    history,
    store,
  };
};
