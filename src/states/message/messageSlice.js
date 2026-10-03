import { createSlice, isRejected } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  type: null, // 'error' | 'success'
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearMessage(state) {
      state.text = '';
      state.type = null;
    },
    setSuccessMessage(state, action) {
      state.text = action.payload;
      state.type = 'success';
    },
    setErrorMessage(state, action) {
      state.text = action.payload;
      state.type = 'error';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      state.text = action.error?.message || 'Terjadi kesalahan, silakan coba lagi.';
      state.type = 'error';
    });
  },
});

export const { clearMessage, setSuccessMessage, setErrorMessage } = messageSlice.actions;

export const selectMessage = (state) => state.message;

export default messageSlice.reducer;
