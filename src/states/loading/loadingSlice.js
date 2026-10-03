import {
  createSlice, isPending, isFulfilled, isRejected,
} from '@reduxjs/toolkit';

const initialState = {
  pendingCount: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.pendingCount += 1;
      })
      .addMatcher(isFulfilled, (state) => {
        state.pendingCount = Math.max(0, state.pendingCount - 1);
      })
      .addMatcher(isRejected, (state) => {
        state.pendingCount = Math.max(0, state.pendingCount - 1);
      });
  },
});

export const selectIsLoading = (state) => state.loading.pendingCount > 0;

export default loadingSlice.reducer;
