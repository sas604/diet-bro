import { configureStore } from '@reduxjs/toolkit';
import mealSlice from '../features/meals/mealSlice';

export const store = configureStore({ reducer: { mealHistory: mealSlice } });
