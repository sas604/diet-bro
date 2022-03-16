import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchMealData = createAsyncThunk('mealHistory/getDataStatus');

const initialState = {};

export const mealSlice = createSlice({
  name: 'mealHistory',
  initialState: {},
  reducers: {
    fetchItemsFulfiled: (state, action) => action.payload,
  },
  //   extraReducers: (buider) => {
  //     buider.addCase();
  //   },
});

export const { fetchItemsFulfiled } = mealSlice.actions;
export default mealSlice.reducer;
