import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { requestReducer } from './request/reducers';
import { reducer as formReducer } from 'redux-form';
import { reducer as authReducer } from './auth/reducers';
import { reducer as toastReducer } from './toast/reducers';
import { reducer as usersReducer } from './users/reducers';
import { reducer as profilesReducer } from './profiles/reducers';
import { reducer as friendsReducer } from './friends/reducers';
import { reducer as contactsReducer } from './contacts/reducers';
import { reducer as questionsReducer } from './questions/reducers';

import { requestEpics } from './request/epics';
import { authEpics } from './auth/epics';
import { toastEpics } from './toast/epics';
import { contactsEpics } from './contacts/epics';
import { usersEpics } from './users/epics';
import { profilesEpics } from './profiles/epics';
import { friendsEpics } from './friends/epics';
import { questionsEpics } from './questions/epics';

import { RequestState } from './request/states';
import { FormsState } from './form/states';
import { AuthState } from './auth/states';
import { ToastState } from './toast/states';
import { UsersState } from './users/states';
import { ProfilesState } from './profiles/states';
import { FriendsState } from './friends/states';
import { ContactsState } from './contacts/states';
import { QuestionsState } from './questions/states';

export interface RootState {
  request: RequestState;
  form: FormsState;
  auth: AuthState;
  toast: ToastState;
  users: UsersState;
  profiles: ProfilesState;
  friends: FriendsState;
  contacts: ContactsState;
  questions: QuestionsState;
}

const rootReducer = combineReducers({
  request: requestReducer,
  form: formReducer,
  auth: authReducer,
  toast: toastReducer,
  users: usersReducer,
  profiles: profilesReducer,
  friends: friendsReducer,
  contacts: contactsReducer,
  questions: questionsReducer,
});

const rootEpic = combineEpics(
  ...requestEpics,
  ...authEpics,
  ...toastEpics,
  ...contactsEpics,
  ...usersEpics,
  ...profilesEpics,
  ...friendsEpics,
  ...questionsEpics,
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
