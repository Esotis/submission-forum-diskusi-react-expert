const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const TOKEN_KEY = 'accessToken';

const isBrowser = typeof window !== 'undefined';

function getAccessToken() {
  if (!isBrowser) return null;
  return localStorage.getItem(TOKEN_KEY);
}

function putAccessToken(token) {
  if (!isBrowser) return;
  localStorage.setItem(TOKEN_KEY, token);
}

function removeAccessToken() {
  if (!isBrowser) return;
  localStorage.removeItem(TOKEN_KEY);
}

async function fetchJson(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (networkError) {
    throw new Error(
      'Tidak dapat terhubung ke server. Periksa kembali data yang '
        + 'dimasukkan (mis. email sudah terdaftar atau kata sandi terlalu '
        + 'pendek), atau koneksi internet Anda, lalu coba lagi.',
    );
  }

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message || 'Terjadi kesalahan, silakan coba lagi.');
  }

  return responseJson.data;
}

function withAuth(options = {}) {
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
}

function withJsonBody(body) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

async function register({ name, email, password }) {
  const { user } = await fetchJson(`${BASE_URL}/register`, {
    method: 'POST',
    ...withJsonBody({ name, email, password }),
  });
  return user;
}

async function login({ email, password }) {
  const { token } = await fetchJson(`${BASE_URL}/login`, {
    method: 'POST',
    ...withJsonBody({ email, password }),
  });
  return token;
}

async function getOwnProfile() {
  const { user } = await fetchJson(`${BASE_URL}/users/me`, withAuth());
  return user;
}

async function getAllUsers() {
  const { users } = await fetchJson(`${BASE_URL}/users`);
  return users;
}

async function getAllThreads() {
  const { threads } = await fetchJson(`${BASE_URL}/threads`);
  return threads;
}

async function getThreadDetail(threadId) {
  const { detailThread } = await fetchJson(`${BASE_URL}/threads/${threadId}`);
  return detailThread;
}

async function createThread({ title, body, category }) {
  const { thread } = await fetchJson(`${BASE_URL}/threads`, {
    method: 'POST',
    ...withAuth(withJsonBody({ title, body, category })),
  });
  return thread;
}

async function createComment({ threadId, content }) {
  const { comment } = await fetchJson(
    `${BASE_URL}/threads/${threadId}/comments`,
    {
      method: 'POST',
      ...withAuth(withJsonBody({ content })),
    },
  );
  return comment;
}

async function upVoteThread(threadId) {
  return fetchJson(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    ...withAuth(),
  });
}

async function downVoteThread(threadId) {
  return fetchJson(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    ...withAuth(),
  });
}

async function neutralizeVoteThread(threadId) {
  return fetchJson(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    ...withAuth(),
  });
}

async function upVoteComment({ threadId, commentId }) {
  return fetchJson(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      ...withAuth(),
    },
  );
}

async function downVoteComment({ threadId, commentId }) {
  return fetchJson(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      ...withAuth(),
    },
  );
}

async function neutralizeVoteComment({ threadId, commentId }) {
  return fetchJson(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      ...withAuth(),
    },
  );
}

async function getLeaderboards() {
  const { leaderboards } = await fetchJson(`${BASE_URL}/leaderboards`);
  return leaderboards;
}

const api = {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
  getLeaderboards,
};

export default api;
