import { describe, it, expect } from 'vitest';
import messageReducer, {
  setSuccessMessage,
  setErrorMessage,
  clearMessage,
} from './messageSlice';
import { fetchThreads } from '../threads/threadsSlice';

describe('messageSlice reducer', () => {
  it('should return the initial state for an unknown action', () => {
    const nextState = messageReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual({ text: '', type: null });
  });

  it('should set a success message on setSuccessMessage', () => {
    const nextState = messageReducer(undefined, setSuccessMessage('Berhasil!'));
    expect(nextState).toEqual({ text: 'Berhasil!', type: 'success' });
  });

  it('should set an error message on setErrorMessage', () => {
    const nextState = messageReducer(undefined, setErrorMessage('Gagal!'));
    expect(nextState).toEqual({ text: 'Gagal!', type: 'error' });
  });

  it('should clear the message on clearMessage', () => {
    const filledState = { text: 'Pesan lama', type: 'error' };
    const nextState = messageReducer(filledState, clearMessage());
    expect(nextState).toEqual({ text: '', type: null });
  });

  it('should set an error message generically when any thunk action is rejected', () => {
    const rejectedAction = fetchThreads.rejected(
      new Error('Gagal memuat thread'),
      'requestId',
    );

    const nextState = messageReducer(undefined, rejectedAction);

    expect(nextState).toEqual({ text: 'Gagal memuat thread', type: 'error' });
  });
});
