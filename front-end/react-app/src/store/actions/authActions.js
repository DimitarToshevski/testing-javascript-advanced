import ApiService from "services/ApiService";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const loginUser = (username, password) => async dispatch => {
  const res = await ApiService.post("login", {
    username,
    password
  });

  if (res.data) {
    sessionStorage.setItem("token", res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    });
  } else {
    dispatch({
      type: LOGIN_ERROR,
      payload: res.message
    });
  }
};

export const logout = () => dispatch => {
  sessionStorage.removeItem("token");

  dispatch({ type: LOGOUT });
};
