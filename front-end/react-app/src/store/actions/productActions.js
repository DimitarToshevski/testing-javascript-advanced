import ApiService from "services/ApiService";

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";

export const getProducts = authToken => async dispatch => {
  const res = await ApiService.get("products", authToken);

  dispatch({
    type: GET_PRODUCTS_SUCCESS,
    payload: res.data
  });
};

export const addProduct = (product, authToken) => async dispatch => {
  const res = await ApiService.post("products", { ...product }, authToken);

  dispatch({
    type: ADD_PRODUCT_SUCCESS,
    payload: {
      id: res.data.id,
      ...product
    }
  });
};

export const deleteProduct = (productId, authToken) => async dispatch => {
  await ApiService.remove(`products/${productId}`, authToken);

  dispatch({
    type: DELETE_PRODUCT_SUCCESS,
    payload: productId
  });
};
