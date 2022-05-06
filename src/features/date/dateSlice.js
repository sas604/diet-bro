import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export const dateSlice = createSlice({
  name: 'date',
  initialState: format(new Date(), 'yyyy-MM-dd'),
  reducers: {
    setDateAction: (state, action) => action.payload,
  },
});

export const { setDateAction } = dateSlice.actions;
export default dateSlice.reducer;
