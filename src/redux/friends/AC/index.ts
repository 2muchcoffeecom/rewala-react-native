import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { FollowRequest } from '../../../shared/models/followRequest.model';
import { UpdateFollowRequestInput } from '../../../shared/services/friend.service';

export enum ActionTypes {
  SET_FRIEND_DATA = 'SET_FRIEND_DATA',
  DELETE_FRIEND_DATA = 'DELETE_FRIEND_DATA',
  ADD_FRIEND = 'ADD_FRIEND',
  UPDATE_FRIEND = 'UPDATE_FRIEND',
  GET_MY_FRIENDS = 'GET_MY_FRIENDS',
  SET_MY_FRIENDS_IDS = 'SET_MY_FRIENDS_IDS',
  DELETE_MY_FRIEND_ID = 'DELETE_MY_FRIEND_ID',
  DELETE_ALL_MY_FRIEND_IDS = 'DELETE_ALL_MY_FRIEND_IDS',
}

export const Actions = {
  setFriendsData: (data: FollowRequest[]) => {
    return createAction(ActionTypes.SET_FRIEND_DATA, {data});
  },
  deleteFriendData: (data: FollowRequest) => {
    return createAction(ActionTypes.DELETE_FRIEND_DATA, {data});
  },
  addFriend: (data: string) => {
    return createAction(ActionTypes.ADD_FRIEND, {data});
  },
  updateFriend: (data: UpdateFollowRequestInput) => {
    return createAction(ActionTypes.UPDATE_FRIEND, {data});
  },
  getMyFriends: () => {
    return createAction(ActionTypes.GET_MY_FRIENDS);
  },
  setMyFriendsIds: (data: string[]) => {
    return createAction(ActionTypes.SET_MY_FRIENDS_IDS, {data});
  },
  deleteMyFriendId: (data: string) => {
    return createAction(ActionTypes.DELETE_MY_FRIEND_ID, {data});
  },
  deleteAllMyFriendIds: () => {
    return createAction(ActionTypes.DELETE_ALL_MY_FRIEND_IDS);
  },
};

export type Actions = ActionsUnion<typeof Actions>;
