import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import threadsReducer from './threads/threadsSlice';
import threadDetailReducer from './threadDetail/threadDetailSlice';
import usersReducer from './users/usersSlice';
import leaderboardsReducer from './leaderboards/leaderboardsSlice';
import loadingReducer from './loading/loadingSlice';
import messageReducer from './message/messageSlice';

export const rootReducer = {
  auth: authReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  users: usersReducer,
  leaderboards: leaderboardsReducer,
  loading: loadingReducer,
  message: messageReducer,
};

export function createAppStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

const store = createAppStore();

export default store;
