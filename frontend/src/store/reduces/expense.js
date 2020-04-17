import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOAD_EXPENSES,
  SET_EXPENSE,
} from "../actions/types";

const initialState = [];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return state;
    case LOAD_EXPENSES:
      return state;
    case SET_EXPENSE:
      return state;
    case DELETE_EXPENSE:
      return state;
    default:
      return state;
  }
}
