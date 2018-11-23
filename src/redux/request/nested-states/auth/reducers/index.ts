import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../nested-states/login/reducers';

export const authReducer = combineReducers({
  login: loginReducer,
});