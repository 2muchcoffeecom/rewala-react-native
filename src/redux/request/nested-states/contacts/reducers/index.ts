import { combineReducers } from 'redux';
import { reducer as sendContactsReducer } from '../nested-states/sendContacts/reducers';

export const contactsReducer = combineReducers({
  sendContacts: sendContactsReducer,
});