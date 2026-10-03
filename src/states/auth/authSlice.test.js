import { describe, it, expect } from 'vitest';
import authReducer, {
  logoutUser,
  loginUser,
  preloadAuthUser,
} from './authSlice';

describe('authSlice reducer', () => {
  it('should return the initial state for an unknown action', () => {
    const nextState = authReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual({ user: null, isPreloading: true });
  });

  it('should set the user on loginUser.fulfilled', () => {
    const user = { id: 'user-1', name: 'Dimas', email: 'dimas@mail.com' };
    const nextState = authReducer(
      { user: null, isPreloading: true },
      loginUser.fulfilled(user, 'requestId', { email: '', password: '' }),
    );

    expect(nextState.user).toEqual(user);
  });

  it('should set the user and finish preloading on preloadAuthUser.fulfilled', () => {
    const user = { id: 'user-1', name: 'Dimas' };
    const nextState = authReducer(
      { user: null, isPreloading: true },
      preloadAuthUser.fulfilled(user, 'requestId'),
    );

    expect(nextState).toEqual({ user, isPreloading: false });
  });

  it('should clear the user and finish preloading on preloadAuthUser.rejected', () => {
    const nextState = authReducer(
      { user: null, isPreloading: true },
      preloadAuthUser.rejected(new Error('Token kedaluwarsa'), 'requestId'),
    );

    expect(nextState).toEqual({ user: null, isPreloading: false });
  });

  it('should clear the user on logoutUser', () => {
    const loggedInState = {
      user: { id: 'user-1', name: 'Dimas' },
      isPreloading: false,
    };
    const nextState = authReducer(loggedInState, logoutUser());

    expect(nextState.user).toBeNull();
  });
});
