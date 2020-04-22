import {
  ADD_RECEIPT,
  DELETE_RECEIPT_ALL,
  DELETE_RECEIPT_NEXT,
  LOAD_RECEIPTS,
  SET_RECEIPT,
} from "../actions/types";

const initialState = [
  {
    id: "1",
    title: "Exemplo unico",
    value: "80",
    description: "",
    date: "2020-04-25",
    type: "unique",
  },
];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_RECEIPT:
      return state.concat({
        ...action.payload,
        id: Math.floor(Math.random() * 10000).toString(),
      });
    case LOAD_RECEIPTS:
      return action.payload;
    case DELETE_RECEIPT_ALL:
      return state.filter((receipt) => receipt.id !== action.payload.id);
    case DELETE_RECEIPT_NEXT:
    case SET_RECEIPT:
      return state.map((receipt) => {
        if (receipt.id === action.payload.id) return action.payload;
        else return receipt;
      });
    default:
      return state;
  }
}
