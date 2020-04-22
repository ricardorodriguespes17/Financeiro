import {
  ADD_REVENUE,
  DELETE_REVENUE,
  LOAD_REVENUES,
  SET_REVENUE,
} from "../actions/types";

const initialState = [
  { id: "1", title: "Dinheiro", value: "15" },
  { id: "2", title: "Conta Nubank", value: "245" },
  { id: "3", title: "Conta Caixa", value: "0" },
  { id: "4", title: "Conta Neon", value: "0" },
];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_REVENUE:
      return state.concat({
        ...action.payload,
        id: Math.floor(Math.random() * 10000).toString(),
      });
    case LOAD_REVENUES:
      return action.payload;
    case SET_REVENUE:
      return state.map((revenue) => {
        if (revenue.id === action.payload.id) return action.payload;
        else return revenue;
      });
    case DELETE_REVENUE:
      return state.filter((revenue) => revenue.id !== action.payload.id);
    default:
      return state;
  }
}
