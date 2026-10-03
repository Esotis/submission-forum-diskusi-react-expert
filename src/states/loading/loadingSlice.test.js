import { describe, it, expect } from 'vitest';
import loadingReducer from './loadingSlice';
import { fetchThreads } from '../threads/threadsSlice';

describe('loadingSlice reducer', () => {
  it('should return the initial state with pendingCount 0', () => {
    const nextState = loadingReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual({ pendingCount: 0 });
  });

  it('should increment pendingCount when any thunk is pending', () => {
    const pendingAction = fetchThreads.pending('requestId');
    const nextState = loadingReducer({ pendingCount: 0 }, pendingAction);
    expect(nextState.pendingCount).toBe(1);
  });

  it('should decrement pendingCount when any thunk is fulfilled', () => {
    const fulfilledAction = fetchThreads.fulfilled([], 'requestId');
    const nextState = loadingReducer({ pendingCount: 2 }, fulfilledAction);
    expect(nextState.pendingCount).toBe(1);
  });

  it('should decrement pendingCount when any thunk is rejected', () => {
    const rejectedAction = fetchThreads.rejected(
      new Error('gagal'),
      'requestId',
    );
    const nextState = loadingReducer({ pendingCount: 1 }, rejectedAction);
    expect(nextState.pendingCount).toBe(0);
  });

  it('should never let pendingCount go below 0', () => {
    const fulfilledAction = fetchThreads.fulfilled([], 'requestId');
    const nextState = loadingReducer({ pendingCount: 0 }, fulfilledAction);
    expect(nextState.pendingCount).toBe(0);
  });
});
