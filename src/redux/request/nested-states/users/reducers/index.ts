import { combineReducers } from 'redux';
import { reducer as getMeReducer } from '../nested-states/getMe/reducers';

export const usersReducer = combineReducers({
  getMe: getMeReducer,
});