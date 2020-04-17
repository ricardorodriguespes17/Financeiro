import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import expenseReduce from "./reduces/expense";
import receiptReduce from "./reduces/receipt";
import revenueReduce from "./reduces/revenue";

const reduces = combineReducers({
  expenseReduce,
  receiptReduce,
  revenueReduce,
});

const store = createStore(
  reduces,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(thunk))
);

export default store;
