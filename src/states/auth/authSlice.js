import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  user: null,
  isPreloading: true,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const user = await api.register({ name, email, password });
    return user;
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const user = await api.getOwnProfile();
    return user;
  },
);

export const preloadAuthUser = createAsyncThunk(
  'auth/preload',
  async () => {
    const token = api.getAccessToken();
    if (!token) return null;

    try {
      const user = await api.getOwnProfile();
      return user;
    } catch (error) {
      api.removeAccessToken();
      throw error;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      api.removeAccessToken();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(preloadAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPreloading = false;
      })
      .addCase(preloadAuthUser.rejected, (state) => {
        state.user = null;
        state.isPreloading = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectIsPreloading = (state) => state.auth.isPreloading;

export default authSlice.reducer;
