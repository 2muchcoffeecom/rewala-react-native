import { combineReducers } from 'redux';
import { authReducer } from '../nested-states/auth/reducers';

export const requestReducer = combineReducers({
  auth: authReducer,
});