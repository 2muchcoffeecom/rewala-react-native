import { combineReducers } from 'redux';
import { reducer as createFollowRequestReducer } from '../nested-states/create/reducers';
import { reducer as updateFollowRequestReducer } from '../nested-states/update/reducers';
import { reducer as getMyFriendsFollowRequestReducer } from '../nested-states/getMyFriends/reducers';

export const friendsReducer = combineReducers({
  create: createFollowRequestReducer,
  update: updateFollowRequestReducer,
  getMyFriends: getMyFriendsFollowRequestReducer,
});