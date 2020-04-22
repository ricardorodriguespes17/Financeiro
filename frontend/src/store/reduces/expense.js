import {
  ADD_EXPENSE,
  DELETE_EXPENSE_ALL,
  DELETE_EXPENSE_NEXT,
  LOAD_EXPENSES,
  SET_EXPENSE,
} from "../actions/types";

const initialState = [
  {
    id: "1",
    title: "Exemplo parcelado",
    value: "20",
    description: "",
    category: "Outros",
    date: "2020-05-01",
    type: "parceled",
    parcels: 1,
    paid: false,
  },
  {
    id: "2",
    title: "Exemplo Continuo",
    value: "100",
    description: "",
    category: "Alimentação",
    date: "2020-04-30",
    type: "continuous",
    paid: false,
  },
  {
    id: "3",
    title: "Exemplo Unico",
    value: "8",
    description: "",
    category: "Casa",
    date: "2020-04-19",
    type: "unique",
    paid: true,
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
