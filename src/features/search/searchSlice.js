// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchData } from '../../utils/fetchSearch';

// // export const fetchSerarchResult = createAsyncThunk(
// //   'search/fetchSearchResults',
// //   async (url, { getState, requestId }) => {
// //     const { currentRequestId, loading } = getState().search;

// //     const res = await fetchData(url);
// //     return res;
// //   }
// // );

// const searchSlice = createSlice({
//   name: 'search',
//   initialState: '',
//   reducers: {
//     setSearchTearm: (state, action) => action.payload,
//   },
//   //   extraReducers: (builder) => {
//   //     builder
//   //       .addCase(fetchSerarchResult.pending, (state, action) => {
//   //         if (state.loading === 'idle') {
//   //           state.loading = 'pending';
//   //           state.currentRequestId = action.meta.requestId;
//   //         }
//   //       })
//   //       .addCase(fetchSerarchResult.fulfilled, (state, action) => {
//   //         const { requestId } = action.meta;
//   //         if (
//   //           state.loading === 'pending' &&
//   //           state.currentRequestId === requestId
//   //         ) {
//   //           state.loading = 'idle';
//   //           state.results = action.payload;
//   //           state.error = null;
//   //           state.currentRequestId = undefined;
//   //         }
//   //       })
//   //       .addCase(fetchSerarchResult.rejected, (state, action) => {
//   //         if (action.error !== 'AbortError') {
//   //           const { requestId } = action.meta;
//   //           if (
//   //             state.loading === 'pending' &&
//   //             state.currentRequestId === requestId
//   //           ) {
//   //             state.loading = 'idle';
//   //             state.error = action.error;
//   //             state.currentRequestId = undefined;
//   //           }
//   //         }
//   //       });
//   //  },
// });

// export default searchSlice.reducer;
// export const { setSearchTearm } = searchSlice.actions;
