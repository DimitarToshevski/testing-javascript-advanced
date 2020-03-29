import ApiService from "services/ApiService";

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";

export const getProducts = () => async dispatch => {
  const res = await ApiService.get("products");

  dispatch({
    type: GET_PRODUCTS_SUCCESS,
    payload: res.data
  });
};

export const addProduct = product => async dispatch => {
  const res = await ApiService.post("products", { ...product });

  dispatch({
    type: ADD_PRODUCT_SUCCESS,
    payload: {
      id: res.data.id,
      ...product
    }
  });
};

export const deleteProduct = productId => async dispatch => {
  await ApiService.remove(`products/${productId}`);

  dispatch({
    type: DELETE_PRODUCT_SUCCESS,
    payload: productId
  });
};

export const editProduct = product => async dispatch => {
  const res = await ApiService.update(`products/${product.id}`, { ...product });

  dispatch({
    type: EDIT_PRODUCT_SUCCESS,
    payload: { ...res.data }
  });
};
