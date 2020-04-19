import {
  ADD_RECEIPT,
  DELETE_RECEIPT,
  SET_RECEIPT,
  LOAD_RECEIPTS,
} from "./types";

function addReceipt(receipt) {
  return {
    type: ADD_RECEIPT,
    payload: receipt,
  };
}

function setReceipt(receipt) {
  return {
    type: SET_RECEIPT,
    payload: receipt,
  };
}

function deleteReceipt(receipt) {
  return {
    type: DELETE_RECEIPT,
    payload: receipt,
  };
}

function getReceipt() {
  return async (dispatch) => {};
}

function loadReceipts(receipts) {
  return {
    type: LOAD_RECEIPTS,
    payload: receipts,
  };
}

export default {
  addReceipt,
  setReceipt,
  deleteReceipt,
  getReceipt,
};
