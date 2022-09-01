import { configureStore } from '@reduxjs/toolkit';
import dateSlice from '../features/date/dateSlice';
import loadingSlice from '../features/loading/loadingSlice';
import mealSlice from '../features/meals/mealSlice';
import searchSlice from '../features/search/searchSlice';
import { authReducer } from '../features/userData/authSlice';
import {
  userColorScemaReducer,
  userReducer,
  weighReducer,
} from '../features/userData/userDataSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    mealHistory: mealSlice,
    date: dateSlice,
    loading: loadingSlice,
    userData: userReducer,
    weight: weighReducer,
    search: searchSlice,
    theme: userColorScemaReducer,
  },
});
