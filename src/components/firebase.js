import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const base = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://diet-bro.firebaseio.com",
  projectId: "diet-bro",
  storageBucket: "diet-bro.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
});
export const provider = new firebase.auth.GithubAuthProvider();
export default base;
