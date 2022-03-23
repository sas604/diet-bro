import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchMealData = createAsyncThunk('mealHistory/getDataStatus');

const initialState = {
  entries: {},
  loading: false,
};

export const mealSlice = createSlice({
  name: 'mealHistory',
  initialState,
  reducers: {
    fetchItemsFulfiled: (state, action) => {
      state.entries = action.payload || {};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  //   extraReducers: (buider) => {
  //     buider.addCase();
  //   },
});

export const { fetchItemsFulfiled, setLoading } = mealSlice.actions;
export default mealSlice.reducer;
