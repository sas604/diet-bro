import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export const dateSlice = createSlice({
  name: 'date',
  initialState: format(new Date(), 'yyyy-MM-dd'),
  reducers: {
    setDate: (state, action) => action.payload,
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
