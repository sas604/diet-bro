import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targetEnergy: 0,
  targetWeight: 0,
};

export const userDataSlice = createSlice({
  name: 'mealHistory',
  initialState,
  reducers: {
    fetchUserDataFulfiled: (state, action) => action.payload,
  },
});

export const { fetchUserDataFulfiled } = userDataSlice.actions;
export default userDataSlice.reducer;
