import {
  ADD_REVENUE,
  DELETE_REVENUE,
  SET_REVENUE,
  LOAD_REVENUES,
} from "./types";

function addRevenue(revenue) {
  return {
    type: ADD_REVENUE,
    payload: revenue,
  };
}

function setRevenue(revenue) {
  return {
    type: SET_REVENUE,
    payload: revenue,
  };
}

function deleteRevenue(revenue) {
  return {
    type: DELETE_REVENUE,
    payload: revenue,
  };
}

function getRevenues() {
  return async (dispatch) => {
    const revenues = [];

    loadRevenues(revenues);
  };
}

function loadRevenues(revenues) {
  return {
    type: LOAD_REVENUES,
    payload: revenues,
  };
}

export default {
  addRevenue,
  setRevenue,
  deleteRevenue,
  getRevenues,
};
