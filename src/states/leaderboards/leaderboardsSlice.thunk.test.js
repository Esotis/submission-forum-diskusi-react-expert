import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAppStore } from '../store';
import { fetchLeaderboards } from './leaderboardsSlice';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    getLeaderboards: vi.fn(),
  },
}));

describe('leaderboardsSlice thunk: fetchLeaderboards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch leaderboards from the API and store them in state', async () => {
    const mockLeaderboards = [
      {
        user: { id: 'user-1', name: 'Dimas', email: 'dimas@mail.com' },
        score: 15,
      },
    ];
    api.getLeaderboards.mockResolvedValue(mockLeaderboards);

    const store = createAppStore();
    await store.dispatch(fetchLeaderboards());

    expect(api.getLeaderboards).toHaveBeenCalledTimes(1);
    expect(store.getState().leaderboards).toEqual(mockLeaderboards);
  });

  it('should store an empty array when the API returns no entries', async () => {
    api.getLeaderboards.mockResolvedValue([]);

    const store = createAppStore();
    await store.dispatch(fetchLeaderboards());

    expect(store.getState().leaderboards).toEqual([]);
  });
});
