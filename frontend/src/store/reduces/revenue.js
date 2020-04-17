import {
  ADD_REVENUE,
  DELETE_REVENUE,
  LOAD_REVENUES,
  SET_REVENUE,
} from "../actions/types";

const initialState = [];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_REVENUE:
      return state;
    case LOAD_REVENUES:
      return state;
    case SET_REVENUE:
      return state;
    case DELETE_REVENUE:
      return state;
    default:
      return state;
  }
}
