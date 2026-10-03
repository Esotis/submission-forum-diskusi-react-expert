import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const users = await api.getAllUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload);
  },
});

export const selectUsers = (state) => state.users;

export const selectUserById = (state, userId) => state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
