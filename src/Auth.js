import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authFireBase, db, firebasePathListner } from './components/firebase';
import { fetchItemsFulfiled } from './features/meals/mealSlice';
import { fetchUserDataFulfiled } from './features/userData/userDataSlice';
export const AuthContext = React.createContext();
const auth = authFireBase;
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      }),
    []
  );
  useEffect(() => {
    if (!currentUser) return;
    const fireDB = ref(db, `users/${currentUser.uid}/mealHistory/${date}`);
    const userRef = ref(db, `users/${currentUser.uid}/data`);

    const unsubscribe = [
      firebasePathListner(
        currentUser.uid,
        fireDB,
        onValue,
        fetchItemsFulfiled
      )(dispatch),

      firebasePathListner(
        currentUser.uid,
        userRef,
        onValue,
        fetchUserDataFulfiled
      )(dispatch),
    ];
    return () => unsubscribe.forEach((f) => f());
  }, [currentUser, dispatch, date]);

  async function updateName(name) {
    try {
      const res = updateProfile(currentUser, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
