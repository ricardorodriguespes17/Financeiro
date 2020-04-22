import {
  ADD_RECEIPT,
  DELETE_RECEIPT_ALL,
  DELETE_RECEIPT_NEXT,
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

function deleteReceiptAll(receipt) {
  return {
    type: DELETE_RECEIPT_ALL,
    payload: receipt,
  };
}

function deleteReceiptNext(receipt) {
  return {
    type: DELETE_RECEIPT_NEXT,
    payload: receipt,
  };
}

function getReceipt() {
  return async (dispatch) => {
    const receipts = [];

    loadReceipts(receipts);
  };
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
  deleteReceiptNext,
  deleteReceiptAll,
  getReceipt,
};
