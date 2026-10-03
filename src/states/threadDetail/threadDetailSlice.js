import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { computeOptimisticVote, VOTE_TYPE } from '../voteHelper';
import { setErrorMessage } from '../message/messageSlice';

const threadVoteApiMap = {
  [VOTE_TYPE.UP]: api.upVoteThread,
  [VOTE_TYPE.DOWN]: api.downVoteThread,
  [VOTE_TYPE.NEUTRAL]: api.neutralizeVoteThread,
};

const commentVoteApiMap = {
  [VOTE_TYPE.UP]: api.upVoteComment,
  [VOTE_TYPE.DOWN]: api.downVoteComment,
  [VOTE_TYPE.NEUTRAL]: api.neutralizeVoteComment,
};

export const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetch',
  async (threadId) => {
    const detailThread = await api.getThreadDetail(threadId);
    return detailThread;
  },
);

export const createComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }) => {
    const comment = await api.createComment({ threadId, content });
    return comment;
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    clearThreadDetail() {
      return null;
    },
    applyThreadDetailVote(state, action) {
      if (!state) return;
      const { upVotesBy, downVotesBy } = action.payload;
      state.upVotesBy = upVotesBy;
      state.downVotesBy = downVotesBy;
    },
    applyCommentVote(state, action) {
      if (!state) return;
      const { commentId, upVotesBy, downVotesBy } = action.payload;
      const comment = state.comments.find((item) => item.id === commentId);
      if (comment) {
        comment.upVotesBy = upVotesBy;
        comment.downVotesBy = downVotesBy;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.fulfilled, (state, action) => action.payload)
      .addCase(createComment.fulfilled, (state, action) => {
        if (!state) return;
        state.comments.unshift(action.payload);
      });
  },
});

export const {
  clearThreadDetail,
  applyThreadDetailVote,
  applyCommentVote,
} = threadDetailSlice.actions;

export function voteThreadDetail({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.user?.id;
    const { threadDetail } = state;
    if (!userId || !threadDetail) return;

    const previousVotes = {
      upVotesBy: threadDetail.upVotesBy,
      downVotesBy: threadDetail.downVotesBy,
    };

    const { upVotesBy, downVotesBy, apiVoteType } = computeOptimisticVote({
      ...previousVotes,
      userId,
      voteType,
    });

    dispatch(applyThreadDetailVote({ upVotesBy, downVotesBy }));

    try {
      await threadVoteApiMap[apiVoteType](threadId);
    } catch (error) {
      dispatch(applyThreadDetailVote(previousVotes));
      dispatch(setErrorMessage(error.message || 'Gagal mengirim vote, silakan coba lagi.'));
    }
  };
}

export function voteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.user?.id;
    const comment = state.threadDetail?.comments.find((item) => item.id === commentId);
    if (!userId || !comment) return;

    const previousVotes = {
      upVotesBy: comment.upVotesBy,
      downVotesBy: comment.downVotesBy,
    };

    const { upVotesBy, downVotesBy, apiVoteType } = computeOptimisticVote({
      ...previousVotes,
      userId,
      voteType,
    });

    dispatch(applyCommentVote({ commentId, upVotesBy, downVotesBy }));

    try {
      await commentVoteApiMap[apiVoteType]({ threadId, commentId });
    } catch (error) {
      dispatch(applyCommentVote({ commentId, ...previousVotes }));
      dispatch(setErrorMessage(error.message || 'Gagal mengirim vote, silakan coba lagi.'));
    }
  };
}

export const selectThreadDetail = (state) => state.threadDetail;

export default threadDetailSlice.reducer;
