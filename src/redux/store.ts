import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { requestReducer } from './request/reducers';
import { reducer as formReducer } from 'redux-form';
import { reducer as authReducer } from './auth/reducers';
import { reducer as toastReducer } from './toast/reducers';
import { reducer as usersReducer } from './users/reducers';
import { reducer as profilesReducer } from './profiles/reducers';

import { requestEpics } from './request/epics';
import { authEpics } from './auth/epics';
import { toastEpics } from './toast/epics';
import { contactsEpics } from './contacts/epics';
import { usersEpics } from './users/epics';
import { profilesEpics } from './profiles/epics';

import { RequestState } from './request/states';
import { FormsState } from './form/states';
import { AuthState } from './auth/states';
import { ToastState } from './toast/states';
import { UsersState } from './users/states';
import { ProfilesState } from './profiles/states';

export interface RootState {
  request: RequestState;
  form: FormsState;
  auth: AuthState;
  toast: ToastState;
  users: UsersState;
  profiles: ProfilesState;
}

const rootReducer = combineReducers({
  request: requestReducer,
  form: formReducer,
  auth: authReducer,
  toast: toastReducer,
  users: usersReducer,
  profiles: profilesReducer,
});

const rootEpic = combineEpics(
  ...requestEpics,
  ...authEpics,
  ...toastEpics,
  ...contactsEpics,
  ...usersEpics,
  ...profilesEpics,
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
