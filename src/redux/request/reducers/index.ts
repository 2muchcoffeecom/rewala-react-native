import { combineReducers } from 'redux';
import { authReducer } from '../nested-states/auth/reducers';
import { contactsReducer } from '../nested-states/contacts/reducers';

export const requestReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});