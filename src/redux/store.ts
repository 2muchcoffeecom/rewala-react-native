import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { requestReducer } from './request/reducers';
import formReducer from './form/reducers';
import { reducer as toastReducer } from './toast/reducers';

import { requestEpics } from './request/epics';
import { authEpics } from './auth/epics';
import { toastEpics } from './toast/epics';

import { RequestState } from './request/states';
import { FormsState } from './form/states';
import { ToastState } from './toast/states';

export interface RootState {
  request: RequestState;
  form: FormsState;
  toast: ToastState;
}

const rootReducer = combineReducers({
  request: requestReducer,
  form: formReducer,
  toast: toastReducer,
});

const rootEpic = combineEpics(
  ...requestEpics,
  ...authEpics,
  ...toastEpics,
);

const epicMiddleware = createEpicMiddleware();

const middleware = [
  epicMiddleware,
];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

epicMiddleware.run(rootEpic);

export default store;
