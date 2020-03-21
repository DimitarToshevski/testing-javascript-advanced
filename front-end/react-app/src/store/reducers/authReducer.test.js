import authReducer, { initialState } from "./authReducer";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions/authActions";

const token = "secret-token";

test("auth reducer should return initial state", () => {
  const state = authReducer();

  expect(state).toEqual(initialState);
});

test("auth reducer should update state on login actions", () => {
  const error = "Incorrect username or password";

  let state = authReducer(initialState, {
    type: LOGIN_ERROR,
    payload: error
  });

  expect(state).toEqual({
    ...initialState,
    error
  });

  state = authReducer(initialState, {
    type: LOGIN_SUCCESS,
    payload: token
  });

  expect(state).toEqual({
    token,
    error: null
  });
});

test("auth reducer should remove token on logout", () => {
  const reducerState = { ...initialState, token };

  const state = authReducer(reducerState, { type: LOGOUT });

  expect(state).toEqual(initialState);
});
