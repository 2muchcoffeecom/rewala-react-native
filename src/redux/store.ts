import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { requestReducer } from './request/reducers';
import formReducer from './form/reducers';

import { requestEpics } from './request/epics';

import { RequestState } from './request/states';
import { FormsState } from './form/states';

export interface RootState {
  request: RequestState;
  form: FormsState;
}

const rootReducer = combineReducers({
  request: requestReducer,
  form: formReducer,
});

const rootEpic = combineEpics(
  ...requestEpics,
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
