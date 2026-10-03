import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchLeaderboards = createAsyncThunk('leaderboards/fetch', async () => {
  const leaderboards = await api.getLeaderboards();
  return leaderboards;
});

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboards.fulfilled, (state, action) => action.payload);
  },
});

export const selectLeaderboards = (state) => state.leaderboards;

export default leaderboardsSlice.reducer;
