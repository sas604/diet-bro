import { format } from "date-fns";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";

const initialState = {
  date: format(new Date(), "yyyy-MM-dd"),

  data: {
    targetEnergy: 2000,
    targetWeight: 0,
    weigtht: {},
  },
  mealHistory: {
    "2020-12-03": 5,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setDate":
      return { ...state, date: action.date };

    case "updateState":
      return {
        ...state,
        data: { ...action.payload },
      };
    case "setInitialData":
      return {
        ...initialState,
        data: { ...initialState.data, name: action.name },
      };
    case "setHistory":
      return { ...state, mealHistory: action.history };
    default:
      return { ...initialState, data: { ...initialState.data } };
  }
};
const getDataFromFirebase = (data, user) => {};
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useContext(AuthContext);

  // load data from the firebase
  useEffect(() => {
    const firebase = base.database().ref("users");
    firebase.on("value", (snapshot) => {
      // check if there user is logged in
      if (currentUser) {
        // if logged dose he has data and update state
        if (snapshot.val() || snapshot.val()[currentUser.uid]) {
          // get user info
          const data = snapshot.val()[currentUser.uid].data;
          if (!data) {
            dispatch({ type: "setInitialData", name: currentUser.displayName });
          } else {
            dispatch({ type: "updateState", payload: { ...data } });
          }
        }
      }
    });
    // close conection to database on rerender
    return () => firebase.off();
  }, [currentUser]);

  // load meal history from fire base for selected date

  useEffect(() => {
    if (!currentUser) return;
    const firebase = base
      .database()
      .ref(`users/${currentUser.uid}/mealHistory`);

    firebase.on("value", (snapshot) => {
      dispatch({
        type: "setHistory",
        history: (snapshot.val() && snapshot.val()[state.date]) || {},
      });
    });
  }, [currentUser, state.date]);
  useEffect(() => {
    if (currentUser) {
      const firebase = base.database().ref(`users/${currentUser.uid}`);
      firebase.update({
        data: { ...state.data },
        mealHistory: { ...state.mealHistory },
      });
    }
  }, [state, currentUser]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
