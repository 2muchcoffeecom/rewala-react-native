import { combineReducers } from 'redux';
import { authReducer } from '../nested-states/auth/reducers';
import { contactsReducer } from '../nested-states/contacts/reducers';
import { friendsReducer } from '../nested-states/friends/reducers';
import { usersReducer } from '../nested-states/users/reducers';
import { questionsReducer } from '../nested-states/questions/reducers';

export const requestReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  friends: friendsReducer,
  users: usersReducer,
  question: questionsReducer,
});