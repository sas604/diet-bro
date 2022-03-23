import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getAuth } from 'firebase/auth';

import { setLoading } from '../features/meals/mealSlice';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: 'https://diet-bro.firebaseio.com',
  projectId: 'diet-bro',
  storageBucket: 'diet-bro.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
});

export const db = getDatabase(app);
export const authFireBase = getAuth();
export function firebasePathListner(uid, firebase, onValue, action) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return onValue(firebase, (snapshot) => {
      dispatch(action(snapshot.val()));
      dispatch(setLoading(false));
    });
  };
}
