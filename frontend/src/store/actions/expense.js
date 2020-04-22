import {
  ADD_EXPENSE,
  SET_EXPENSE,
  LOAD_EXPENSES,
  DELETE_EXPENSE_ALL,
  DELETE_EXPENSE_NEXT,
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

function deleteExpenseNext(expense) {
  return {
    type: DELETE_EXPENSE_NEXT,
    payload: expense,
  };
}

function deleteExpenseAll(expense) {
  return {
    type: DELETE_EXPENSE_ALL,
    payload: expense,
  };
}

function getExpenses() {
  return async (dispatch) => {
    const expenses = [];

    loadExpenses(expenses);
  };
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
  deleteExpenseAll,
  deleteExpenseNext,
  getExpenses,
};
