import { put, call, take, select } from 'redux-saga/effects';
import axios from 'axios';

const ADD_MOVIE = 'movie-list/listBuilder/ADD_MOVIE';
const REMOVE_MOVIE = 'movie-list/listBuilder/REMOVE_MOVIE';
const SET_TITLE = 'movie-list/listBuilder/SET_TITLE';
const RESET = 'movie-list/listBuilder/RESET';


const SAVE_LIST_REQUEST = 'movie-list/listBuilder/SAVE_LIST_REQUEST';
const SAVE_LIST_SUCCESS = 'movie-list/listBuilder/SAVE_LIST_SUCCESS';
const SAVE_LIST_FAILURE = 'movie-list/listBuilder/SAVE_LIST_FAILURE';

const initialState = {
  movies: [],
  title: '',
  fetching: false,
  error: null,
  done: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, { ...action.movie }]
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        movies: [
          ...state.movies.slice(0, action.index),
          ...state.movies.slice(action.index + 1)
        ]
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.title
      };
    case SAVE_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SAVE_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        done: true
      };
    case SAVE_LIST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}

export function addMovie(movie) {
  return { type: ADD_MOVIE, movie };
}

export function removeMovie(index) {
  return { type: REMOVE_MOVIE, index };
}

export function setTitle(title) {
  return { type: SET_TITLE, title };
};

export function reset() {
  return { type: RESET };
}

export function saveListRequest() {
  return { type: SAVE_LIST_REQUEST };
}

export function saveListSuccess() {
  return { type: SAVE_LIST_SUCCESS };
}

export function saveListFailure(error) {
  return { type: SAVE_LIST_FAILURE, error };
}

export function* saveListSaga() {
  try {
    const title = yield select(state => state.listBuilder.title);
    const movies = yield select(state => state.listBuilder.movies);
    const data = {
      title,
      movies: movies.map(movie => movie.id)
    };
    yield axios.post('/api/movie-lists', data);
    yield put(saveListSuccess());
    yield put(reset());
  } catch (error) {
    yield put(saveListRequest(error));
  }
}

export function* watchSaveListSaga() {
  while(true) {
    yield take(SAVE_LIST_REQUEST);
    yield call(saveListSaga);
  }
}
