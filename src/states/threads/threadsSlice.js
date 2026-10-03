import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { computeOptimisticVote, VOTE_TYPE } from '../voteHelper';
import { setErrorMessage } from '../message/messageSlice';

const voteApiMap = {
  [VOTE_TYPE.UP]: api.upVoteThread,
  [VOTE_TYPE.DOWN]: api.downVoteThread,
  [VOTE_TYPE.NEUTRAL]: api.neutralizeVoteThread,
};

export const fetchThreads = createAsyncThunk('threads/fetchAll', async () => {
  const threads = await api.getAllThreads();
  return threads;
});

export const createThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category }) => {
    const thread = await api.createThread({ title, body, category });
    return thread;
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    applyThreadVote(state, action) {
      const { threadId, upVotesBy, downVotesBy } = action.payload;
      const thread = state.find((item) => item.id === threadId);
      if (thread) {
        thread.upVotesBy = upVotesBy;
        thread.downVotesBy = downVotesBy;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.fulfilled, (state, action) => action.payload)
      .addCase(createThread.fulfilled, (state, action) => {
        state.unshift(action.payload);
      });
  },
});

export const { applyThreadVote } = threadsSlice.actions;

export function voteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.user?.id;
    const thread = state.threads.find((item) => item.id === threadId);
    if (!userId || !thread) return;

    const previousVotes = {
      upVotesBy: thread.upVotesBy,
      downVotesBy: thread.downVotesBy,
    };

    const { upVotesBy, downVotesBy, apiVoteType } = computeOptimisticVote({
      ...previousVotes,
      userId,
      voteType,
    });

    dispatch(applyThreadVote({ threadId, upVotesBy, downVotesBy }));

    try {
      await voteApiMap[apiVoteType](threadId);
    } catch (error) {
      dispatch(applyThreadVote({ threadId, ...previousVotes }));
      dispatch(
        setErrorMessage(
          error.message || 'Gagal mengirim vote, silakan coba lagi.',
        ),
      );
    }
  };
}

export const selectThreads = (state) => state.threads;

export default threadsSlice.reducer;
