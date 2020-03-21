import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "store/reducers";

export const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...options
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
