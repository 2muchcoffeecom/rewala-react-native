import { combineReducers } from 'redux';
import { reducer as getMeReducer } from '../nested-states/getMe/reducers';
import { reducer as updateMeReducer } from '../nested-states/updateMe/reducers';
import { reducer as searchReducer } from '../nested-states/search/reducers';
import { reducer as userFriendsReducer } from '../nested-states/userFriends/reducers';

export const usersReducer = combineReducers({
  getMe: getMeReducer,
  updateMe: updateMeReducer,
  search: searchReducer,
  userFriends: userFriendsReducer,
});