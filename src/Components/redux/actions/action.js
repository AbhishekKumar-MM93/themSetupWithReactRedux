import { allUserApi, allProductApi } from "../../Api/Allapi"; // Update the import path accordingly
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchUsers =
  (page, pageSize, searchQuery, auth) => async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USERS_REQUEST,
      });
      const usersData = await allUserApi(page, pageSize, searchQuery, auth);
      const { body, totalPages } = usersData;
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: { body, totalPages },
      });
    } catch (error) {
      console.log(error.message, "===========error ===== message ");
      dispatch({ type: FETCH_USERS_FAILURE, payload: error });
    }
  };

export const fetchProduct = (page, pageSize, search) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
    });

    const productData = await allProductApi(page, pageSize, search);
    const { body, totalPages } = productData;

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: { body, totalPages },
    });
  } catch (error) {
    console.log(error.message, "====== from product api ");
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
  }
};
