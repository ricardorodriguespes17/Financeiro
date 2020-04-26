import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import expenses from "./reduces/expense";
import receipts from "./reduces/receipt";
import revenues from "./reduces/revenue";
import user from "./reduces/user";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const reduces = combineReducers({
  expenses,
  receipts,
  revenues,
  user,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const store = createStore(
  reduces,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(thunk))
);

export default store;
