import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyBohL0zO5FyV4aX5Tu8ow9JV4RJSmDUdjI",
  authDomain: "financeiro-tabelas.firebaseapp.com",
  databaseURL: "https://financeiro-tabelas.firebaseio.com",
  projectId: "financeiro-tabelas",
  storageBucket: "financeiro-tabelas.appspot.com",
  messagingSenderId: "370437646146",
  appId: "1:370437646146:web:4ba83d02b0c5a7ba6ecadb",
  measurementId: "G-06XSY3DR34",
};

firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
