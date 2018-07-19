import axios from 'axios';
import { call, take, put } from 'redux-saga/effects';

const SIGN_IN_REQUEST = 'movie-list/auth/SIGN_IN_REQUEST';
const SIGN_IN_SUCCESS = 'movie-list/auth/SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'movie-list/auth/SIGN_IN_FAILURE';

const initialState = {
  fetching: false,
  user: null,
  error: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: { ...action.user },
        token: action.token,
        error: null
      };
    case SIGN_IN_FAILURE:
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

export function signInSuccess(user, token) {
  return { type: SIGN_IN_SUCCESS, user, token };
}

export function signInFailure(error) {
  return { type: SIGN_IN_FAILURE, error };
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* signInSaga(email, password) {
  try {
    const signInResponse = yield axios.post('/api/auth/email', {
      email,
      password
    });
    const token = signInResponse.data.token;
    const userResponse = yield axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = userResponse.data;
    yield delay(5000);
    yield put(signInSuccess(user, token));
  } catch (error) {
    yield delay(5000);
    yield put(signInFailure(error.response));
  }
}

export function* watchSignInSaga() {
  while (true) {
    const { email, password } = yield take(SIGN_IN_REQUEST);
    yield call(signInSaga, email, password);
  }
}
