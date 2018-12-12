import { combineReducers } from 'redux';
import { reducer as getMeReducer } from '../nested-states/getMe/reducers';
import { reducer as updateMeReducer } from '../nested-states/updateMe/reducers';

export const usersReducer = combineReducers({
  getMe: getMeReducer,
  updateMe: updateMeReducer,
});