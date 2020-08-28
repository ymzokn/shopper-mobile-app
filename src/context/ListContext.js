import createDataContext from "./createDataContext";
import shopperApi from "../api/shopper";
import { navigateWithReset } from "./../../RootNavigation";

const listReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const createList = (dispatch) => {
  return async (list) => {
    try {
      const response = await shopperApi.post("/lists", list);
      navigateWithReset("Lists");
    } catch (error) {
      alert(error);
    }
  };
};

const deleteList = (dispatch) => {
  return async (list) => {
    try {
      await shopperApi.delete("/lists/" + list._id);
      return navigateWithReset("Lists");
    } catch (error) {
      alert(error);
    }
  };
};

const updateList = (dispatch) => {
  return async (list) => {
    try {
      const response = await shopperApi.patch("/lists/" + list._id, {
        items: list.items,
      });
      return response.data;
    } catch (error) {
      alert(error);
    }
  };
};

const startLoading = (dispatch) => {
  return async () => {
    dispatch({ type: "START_LOADING" });
  };
};

const stopLoading = (dispatch) => {
  return async () => {
    dispatch({ type: "STOP_LOADING" });
  };
};

export const { Provider, Context } = createDataContext(
  listReducer,
  { createList, deleteList, updateList, startLoading, stopLoading },
  { lists: [] }
);
