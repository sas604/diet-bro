import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { off, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authFireBase, db, MealHistoryListner } from './components/firebase';
export const AuthContext = React.createContext();
const auth = authFireBase;
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();
  async function updateName(name) {
    try {
      const res = updateProfile(currentUser, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      }),
    []
  );
  useEffect(() => {
    if (!currentUser) return;
    const fireDB = ref(db, `users/${currentUser.uid}/mealHistory`);
    return MealHistoryListner(currentUser.uid, fireDB, onValue)(dispatch);
  }, [currentUser, dispatch]);

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
