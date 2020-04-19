import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOAD_EXPENSES,
  SET_EXPENSE,
} from "../actions/types";

const initialState = [
  {
    id: "1",
    title: "Recarga Oi",
    value: "20",
    description: "",
    category: "Telefonia",
    color: "#FFFFFF",
    date: "2020-04-01",
  },
  {
    id: "2",
    title: "Aluguel",
    value: "250",
    description: "",
    category: "Casa",
    color: "#FFFFFF",
    date: "2020-04-30",
  },
  {
    id: "3",
    title: "Spotify",
    value: "8",
    description: "",
    category: "Lazer",
    color: "#FFFFFF",
    date: "2020-04-20",
  },
];

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return state.concat({
        ...action.payload,
        id: Math.floor(Math.random() * 10000).toString(),
      });
    case LOAD_EXPENSES:
      return action.payload;
    case SET_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.payload.id) return action.payload;
        else return expense;
      });
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}
