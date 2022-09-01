import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setLoginStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
