import {
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS
} from "../actions/productActions";

export const initialState = {
  data: []
};

export default function productReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(product => product.id !== action.payload)
      };

    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }

          return product;
        })
      };

    default:
      return state;
  }
}
