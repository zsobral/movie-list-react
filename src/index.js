import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import './index.css';
import authReducer, {
  watchSignInSaga,
  watchCheckAuthSaga,
  watchLogoutSaga
} from './store/auth';
import listBuilderReducer, {
  watchSaveListSaga
} from './store/listBuilder';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  listBuilder: listBuilderReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchSignInSaga);
sagaMiddleware.run(watchCheckAuthSaga);
sagaMiddleware.run(watchLogoutSaga);
sagaMiddleware.run(watchSaveListSaga)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
