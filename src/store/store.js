import { configureStore } from '@reduxjs/toolkit';
import dateSlice from '../features/date/dateSlice';
import loadingSlice from '../features/loading/loadingSlice';
import mealSlice from '../features/meals/mealSlice';
import userDataSlice from '../features/userData/userDataSlice';

export const store = configureStore({
  reducer: {
    mealHistory: mealSlice,
    date: dateSlice,
    loading: loadingSlice,
    userData: userDataSlice,
  },
});
