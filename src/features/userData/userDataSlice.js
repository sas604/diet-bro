import { createSlice } from '@reduxjs/toolkit';
import { getUserColorSchema } from '../../utils/getUserColorSchema';

const initialState = {
  targetEnergy: 1900,
  targetWeight: 0,
};
export const userColorScemaSlice = createSlice({
  name: 'theme',
  initialState: getUserColorSchema(),
  reducers: {
    setColorScheme: (state, action) => action.payload,
  },
});
export const userDataSlice = createSlice({
  name: 'mealHistory',
  initialState,
  reducers: {
    fetchUserDataFulfiled: (state, action) => ({ ...state, ...action.payload }),
  },
});
export const weightSlice = createSlice({
  name: 'weight',
  initialState: {},
  reducers: {
    fetchWeightFulfiled: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { fetchUserDataFulfiled } = userDataSlice.actions;
export const { fetchWeightFulfiled } = weightSlice.actions;
export const { setColorScheme } = userColorScemaSlice.actions;
export const userReducer = userDataSlice.reducer;
export const weighReducer = weightSlice.reducer;
export const userColorScemaReducer = userColorScemaSlice.reducer;
