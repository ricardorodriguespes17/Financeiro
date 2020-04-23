import { LOGIN, LOGOUT } from "../actions/types";

initialState = {
  name: "",
  email: "",
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        name: action.payload.name,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        name: "",
        email: "",
      };
    default:
      return state;
  }
}
