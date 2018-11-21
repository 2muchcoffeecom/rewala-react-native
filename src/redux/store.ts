import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

export interface RootState {
}

const rootReducer = combineReducers({});

const rootEpic = combineEpics(
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
