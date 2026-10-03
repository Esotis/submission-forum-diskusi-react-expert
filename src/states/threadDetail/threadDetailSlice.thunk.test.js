import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { createAppStore } from '../store';
import { fetchThreadDetail, createComment } from './threadDetailSlice';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    getThreadDetail: vi.fn(),
    createComment: vi.fn(),
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
    upVoteComment: vi.fn(),
    downVoteComment: vi.fn(),
    neutralizeVoteComment: vi.fn(),
  },
}));

describe('threadDetailSlice thunks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchThreadDetail should fetch the detail thread by id and store it in state', async () => {
    const detail = {
      id: 'thread-1',
      title: 'Judul',
      body: '<p>Isi</p>',
      comments: [],
    };
    api.getThreadDetail.mockResolvedValue(detail);

    const store = createAppStore();
    await store.dispatch(fetchThreadDetail('thread-1'));

    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(store.getState().threadDetail).toEqual(detail);
  });

  it('createComment should prepend the new comment to threadDetail.comments', async () => {
    const newComment = { id: 'comment-1', content: 'Komentar pertama' };
    api.createComment.mockResolvedValue(newComment);

    const store = createAppStore({
      threadDetail: {
        id: 'thread-1',
        title: 'Judul',
        comments: [],
      },
    });

    await store.dispatch(
      createComment({ threadId: 'thread-1', content: 'Komentar pertama' }),
    );

    expect(api.createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: 'Komentar pertama',
    });
    expect(store.getState().threadDetail.comments[0]).toEqual(newComment);
  });

  it('createComment should leave comments unchanged and reject when the API call fails', async () => {
    api.createComment.mockRejectedValue(
      new Error('Anda harus login terlebih dahulu'),
    );

    const store = createAppStore({
      threadDetail: {
        id: 'thread-1',
        title: 'Judul',
        comments: [],
      },
    });

    const resultAction = await store.dispatch(
      createComment({ threadId: 'thread-1', content: 'Komentar' }),
    );

    expect(resultAction.type).toBe('threadDetail/createComment/rejected');
    expect(store.getState().threadDetail.comments).toEqual([]);
  });
});
