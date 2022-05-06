import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targetEnergy: 1900,
  targetWeight: 0,
};

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
export const userReducer = userDataSlice.reducer;
export const weighReducer = weightSlice.reducer;