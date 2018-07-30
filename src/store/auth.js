import axios from 'axios';
import { call, take, put } from 'redux-saga/effects';

const SIGN_IN_REQUEST = 'movie-list/auth/SIGN_IN_REQUEST';
const SIGN_IN_SUCCESS = 'movie-list/auth/SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'movie-list/auth/SIGN_IN_FAILURE';

const CHECK_AUTH_REQUEST = 'movie-list/auth/CHECK_AUTH_REQUEST';
const CHECK_AUTH_SUCCESS = 'movie-list/auth/CHECK_AUTH_SUCCESS';
const CHECK_AUTH_FAILURE = 'movie-list/auth/CHECK_AUTH_FAILURE';

const LOGOUT_REQUEST = 'movie-list/auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'movie-list/auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'movie-list/auth/LOGOUT_FAILURE';

const initialState = {
  fetching: false,
  user: null,
  error: null,
  init: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: { ...action.user },
        error: null
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        fetching: false,
        error: { ...action.error }
      };
    case CHECK_AUTH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        fetching: false,
        init: true,
        user: { ...action.user }
      };
    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        fetching: false,
        init: true
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: null
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: { ...action.error }
      };
    default:
      return state;
  }
}

export function signIn(email, password) {
  return { type: SIGN_IN_REQUEST, email, password };
}

export function signInSuccess(user) {
  return { type: SIGN_IN_SUCCESS, user };
}

export function signInFailure(error) {
  return { type: SIGN_IN_FAILURE, error };
}

export function checkAuth() {
  return { type: CHECK_AUTH_REQUEST };
}

export function checkAuthSuccess(user) {
  return { type: CHECK_AUTH_SUCCESS, user };
}

export function checkAuthFailure(error) {
  return { type: CHECK_AUTH_FAILURE, error };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export function logoutFailure(error) {
  return { type: LOGOUT_FAILURE, error };
}

export function* signInSaga(email, password) {
  try {
    yield axios.post('/api/auth/email', {
      email,
      password
    });
    const userResponse = yield axios.get('/api/users/me');
    const user = userResponse.data;
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.response));
  }
}

export function* checkAuthSaga() {
  try {
    const response = yield axios.get('/api/users/me');
    const user = response.data;
    yield put(checkAuthSuccess(user));
  } catch (error) {
    yield put(checkAuthFailure(error.response));
  }
}

export function* logoutSaga() {
  try {
    yield axios.delete('/api/logout');
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.response));
  }
}

export function* watchSignInSaga() {
  while (true) {
    const { email, password } = yield take(SIGN_IN_REQUEST);
    yield call(signInSaga, email, password);
  }
}

export function* watchCheckAuthSaga() {
  while(true) {
    yield take(CHECK_AUTH_REQUEST);
    yield call(checkAuthSaga);
  }
}

export function* watchLogoutSaga() {
  while(true) {
    yield take(LOGOUT_REQUEST);
    yield call(logoutSaga);
  }
}
