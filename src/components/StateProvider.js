import { format, getTime } from "date-fns";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "../Auth";
import base from "./firebase";

const initialState = {
  date: format(new Date(), "yyyy-MM-dd"),
  loading: true,
  data: {
    targetEnergy: 2001,
    targetWeight: 0,
  },
  mealHistory: {},
  weight: {},
};

const reducer = (state, action) => {
  const stamp = getTime(new Date());
  switch (action.type) {
    case "setDate":
      return { ...state, date: action.date };

    case "updateState":
      return {
        ...state,
        loading: false,
        data: { ...action.payload.data },
        mealHistory: action.payload.mealHistory
          ? { [state.date]: { ...action.payload.mealHistory[state.date] } }
          : {},
        weight: { ...action.payload.weight } || {},
      };

    case "setInitialData":
      return {
        ...initialState,
        loading: false,
        data: {
          ...initialState.data,
        }, // to prevent the load of empty state
      };

    case "addMeal":
      return {
        ...state,
        mealHistory: {
          ...state.mealHistory,
          [state.date]: {
            ...state.mealHistory[state.date],
            [stamp]: action.food,
          },
        },
      };
    case "del":
      return {
        ...state,
        mealHistory: {
          ...state.mealHistory,
          [state.date]: { ...action.state },
        },
      };
    case "delWeight":
      return {
        ...state,
        weight: {
          ...action.weight,
        },
      };

    case "setWeight":
      return {
        ...state,
        weight: {
          [state.date]: action.weight,
        },
      };
    case "updateSettings":
      console.log(action);
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    default:
      return { ...initialState, data: { ...initialState.data } };
  }
};
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useContext(AuthContext);
  // load data from the firebase
  useEffect(() => {
    const firebase = base.database().ref(`users/${currentUser.uid}`);
    firebase.on("value", (snapshot) => {
      // check if there user is logged in
      if (!snapshot.val()) {
        // get user info
        console.log("initial");
        firebase.set({
          data: {
            ...state.data,
            name: currentUser.displayName,
            id: currentUser.uid,
          },
        });
        dispatch({
          type: "setInitialData",
        });
      } else {
        const data = snapshot.val();
        dispatch({ type: "updateState", payload: { ...data } });
      }
    });
    // close conection to database on rerender
    return () => firebase.off();
  }, [currentUser, state.date]);

  //  firebase  data updater
  useEffect(() => {
    //if (!state.data.loaded) return;
    const firebase = base.database().ref(`users/${currentUser.uid}`);
    const updates = {};

    updates[`/data`] = state.data;
    if (state.weight[state.date]) {
      updates[`/weight/${state.date}`] = state.weight[state.date];
    }
    if (state.mealHistory[state.date]) {
      updates[`/mealHistory/${state.date}`] = state.mealHistory[state.date];
    }
    firebase.update(updates);
  }, [state, currentUser]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
