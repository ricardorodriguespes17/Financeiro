import {
  ADD_RECEIPT,
  DELETE_RECEIPT,
  LOAD_RECEIPTS,
  SET_RECEIPT,
} from "../actions/types";

const initialState = [
  {
    id: "1",
    title: "Mãe",
    value: "250",
    description: "Para pagar o aluguel",
    date: "2020-04-25",
  },
  {
    id: "2",
    title: "Thiago",
    value: "4",
    description: "Para pagar o Spotify",
    date: "2020-04-20",
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
    case SET_RECEIPT:
      return state.map((receipt) => {
        if (receipt.id === action.payload.id) return action.payload;
        else return receipt;
      });
    case DELETE_RECEIPT:
      return state.filter((receipt) => receipt.id !== action.payload.id);
    default:
      return state;
  }
}
