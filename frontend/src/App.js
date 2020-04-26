import React, { useEffect } from "react";
import Routes from "./routes";

import "./styles/global.css";
import setTheme from "./styles/setTheme";

import { Provider } from "react-redux";
import store from "./store";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebaseConfig from "./config";
import firebase from "firebase";

export default function App() {
  useEffect(() => setTheme());

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        config={firebaseConfig}
        firebase={firebase}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <Routes />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
