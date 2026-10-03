import { describe, it, expect } from 'vitest';
import threadsReducer, {
  applyThreadVote,
  fetchThreads,
  createThread,
} from './threadsSlice';

describe('threadsSlice reducer', () => {
  it('should return the initial state (empty array) when given an unknown action', () => {
    const nextState = threadsReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual([]);
  });

  it('should replace state with the fetched threads on fetchThreads.fulfilled', () => {
    const initialState = [];
    const fetchedThreads = [
      { id: 'thread-1', title: 'Thread Pertama' },
      { id: 'thread-2', title: 'Thread Kedua' },
    ];

    const nextState = threadsReducer(
      initialState,
      fetchThreads.fulfilled(fetchedThreads, 'requestId'),
    );

    expect(nextState).toEqual(fetchedThreads);
  });

  it('should prepend the new thread on createThread.fulfilled', () => {
    const initialState = [{ id: 'thread-old', title: 'Thread Lama' }];
    const newThread = { id: 'thread-new', title: 'Thread Baru' };

    const nextState = threadsReducer(
      initialState,
      createThread.fulfilled(newThread, 'requestId', {}),
    );

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should update upVotesBy and downVotesBy for the matching thread on applyThreadVote', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const nextState = threadsReducer(
      initialState,
      applyThreadVote({
        threadId: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      }),
    );

    expect(nextState[0].upVotesBy).toEqual(['user-1']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should do nothing when applyThreadVote references a thread id that does not exist', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const nextState = threadsReducer(
      initialState,
      applyThreadVote({
        threadId: 'thread-tidak-ada',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      }),
    );

    expect(nextState).toEqual(initialState);
  });
});
