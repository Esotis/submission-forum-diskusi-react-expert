import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAppStore } from '../store';
import { fetchThreads, voteThread } from './threadsSlice';
import { VOTE_TYPE } from '../voteHelper';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    getAllThreads: vi.fn(),
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
  },
}));

describe('threadsSlice thunks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchThreads should fetch threads from the API and store them in state', async () => {
    const mockThreads = [{ id: 'thread-1', title: 'Judul Thread' }];
    api.getAllThreads.mockResolvedValue(mockThreads);

    const store = createAppStore();
    await store.dispatch(fetchThreads());

    expect(api.getAllThreads).toHaveBeenCalledTimes(1);
    expect(store.getState().threads).toEqual(mockThreads);
  });

  it('fetchThreads should result in a rejected action when the API call fails', async () => {
    api.getAllThreads.mockRejectedValue(new Error('Gagal memuat thread'));

    const store = createAppStore();
    const resultAction = await store.dispatch(fetchThreads());

    expect(resultAction.type).toBe('threads/fetchAll/rejected');
    expect(store.getState().message.text).toBe('Gagal memuat thread');
  });

  it('voteThread should optimistically apply the vote before the API call resolves', async () => {
    let resolveVote;
    api.upVoteThread.mockReturnValue(
      new Promise((resolve) => {
        resolveVote = resolve;
      }),
    );

    const store = createAppStore({
      auth: { user: { id: 'user-1' }, isPreloading: false },
      threads: [
        {
          id: 'thread-1',
          title: 'Judul',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });

    const dispatchPromise = store.dispatch(
      voteThread({ threadId: 'thread-1', voteType: VOTE_TYPE.UP }),
    );

    expect(store.getState().threads[0].upVotesBy).toEqual(['user-1']);

    resolveVote();
    await dispatchPromise;
  });

  it('voteThread should revert the optimistic update when the API call fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Gagal vote'));

    const store = createAppStore({
      auth: { user: { id: 'user-1' }, isPreloading: false },
      threads: [
        {
          id: 'thread-1',
          title: 'Judul',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });

    await store.dispatch(
      voteThread({ threadId: 'thread-1', voteType: VOTE_TYPE.UP }),
    );

    expect(store.getState().threads[0].upVotesBy).toEqual([]);
    expect(store.getState().message.text).toBe('Gagal vote');
  });
});
