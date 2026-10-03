import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { createAppStore } from '../store';
import { loginUser } from './authSlice';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

describe('authSlice thunk: loginUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call login, store the token, then fetch and store the profile on success', async () => {
    const user = { id: 'user-1', name: 'Dimas', email: 'dimas@mail.com' };
    api.login.mockResolvedValue('fake-access-token');
    api.getOwnProfile.mockResolvedValue(user);

    const store = createAppStore();
    await store.dispatch(
      loginUser({ email: 'dimas@mail.com', password: 'rahasia' }),
    );

    expect(api.login).toHaveBeenCalledWith({
      email: 'dimas@mail.com',
      password: 'rahasia',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-access-token');
    expect(api.getOwnProfile).toHaveBeenCalledTimes(1);
    expect(store.getState().auth.user).toEqual(user);
  });

  it('should keep the user unauthenticated and surface an error message when login fails', async () => {
    api.login.mockRejectedValue(new Error('Email atau kata sandi salah'));

    const store = createAppStore();
    await store.dispatch(
      loginUser({ email: 'salah@mail.com', password: 'salah' }),
    );

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().message.text).toBe('Email atau kata sandi salah');
    expect(api.getOwnProfile).not.toHaveBeenCalled();
  });
});
