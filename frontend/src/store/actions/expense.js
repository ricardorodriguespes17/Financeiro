import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SET_EXPENSE,
  LOAD_EXPENSES,
} from "./types";

function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}

function setExpense(expense) {
  return {
    type: SET_EXPENSE,
    payload: expense,
  };
}

function deleteExpense(expense) {
  return {
    type: DELETE_EXPENSE,
    payload: expense,
  };
}

function getExpenses() {
  return async (dispatch) => {};
}

function loadExpenses(expenses) {
  return {
    type: LOAD_EXPENSES,
    payload: expenses,
  };
}

export default {
  addExpense,
  setExpense,
  deleteExpense,
  getExpenses,
};
