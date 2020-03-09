import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions/authActions";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
}
