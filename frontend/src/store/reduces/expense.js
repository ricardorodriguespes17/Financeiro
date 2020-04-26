import {
  ADD_EXPENSE,
  DELETE_EXPENSE_ALL,
  DELETE_EXPENSE_NEXT,
  LOAD_EXPENSES,
  SET_EXPENSE,
} from "../actions/types";

const initialState = [];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return state.concat(action.payload);
    case LOAD_EXPENSES:
      return action.payload;
    case DELETE_EXPENSE_ALL:
      return state.filter((expense) => expense.id !== action.payload.id);
    case DELETE_EXPENSE_NEXT:
    case SET_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.payload.id) return action.payload;
        else return expense;
      });
    default:
      return state;
  }
}
