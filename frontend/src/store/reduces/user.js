import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  id: "",
  name: "",
  email: "",
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        id: "",
        name: "",
        email: "",
      };
    default:
      return state;
  }
}
