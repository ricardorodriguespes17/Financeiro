import {
  ADD_RECEIPT,
  DELETE_RECEIPT,
  LOAD_RECEIPTS,
  SET_RECEIPT,
} from "../actions/types";

const initialState = [];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_RECEIPT:
      return state;
    case LOAD_RECEIPTS:
      return state;
    case SET_RECEIPT:
      return state;
    case DELETE_RECEIPT:
      return state;
    default:
      return state;
  }
}
