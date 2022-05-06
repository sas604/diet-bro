import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { setLoading } from '../features/meals/mealSlice';
import { getTime } from 'date-fns';
import { store } from '../store/store';

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
export function firebasePathListner(firebase, onValue, action) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return onValue(firebase, (snapshot) => {
      dispatch(action(snapshot.val()));
      dispatch(setLoading(false));
    });
  };
}
export async function postMealToFirebase(data) {
  const { date } = store.getState();
  const stamp = getTime(new Date());
  const firebase = ref(
    db,
    `users/${authFireBase.currentUser.uid}/mealHistory/${date}/${stamp}`
  );
  const error = await update(firebase, data);
  if (error) {
    console.log(error);
  }
}
export async function deleteMealFromFirebase(stamp) {
  const { date } = store.getState();
  const firebase = ref(
    db,
    `users/${authFireBase.currentUser.uid}/mealHistory/${date}`
  );
  const error = await update(firebase, { [stamp]: null });
  if (error) {
    console.log(error);
  }
}
export async function weightEntryFirebase(stamp, data = null) {
  const firebase = ref(db, `users/${authFireBase.currentUser.uid}/weight`);
  const error = await update(firebase, { [stamp]: data });
  if (error) {
    console.log(error);
  }
}

export async function updateUserDataFirebase(prop, data) {
  const firebase = ref(db, `users/${authFireBase.currentUser.uid}/data`);
  const error = await update(firebase, { [prop]: data });
  if (error) {
    console.log(error);
  }
}
