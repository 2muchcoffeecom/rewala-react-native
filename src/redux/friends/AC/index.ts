import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { FollowRequest } from '../../../shared/models/followRequest.model';
import { UpdateFollowRequestInput } from '../../../shared/services/friend.service';

export enum ActionTypes {
  SET_FRIEND_DATA = 'SET_FRIEND_DATA',
  ADD_FRIEND = 'ADD_FRIEND',
  DELETE_FRIEND = 'DELETE_FRIEND',
  GET_MY_FRIENDS = 'GET_MY_FRIENDS',
  SET_MY_FRIENDS_IDS = 'SET_MY_FRIENDS_IDS',
}

export const Actions = {
  setFriendsData: (data: FollowRequest[]) => {
    return createAction(ActionTypes.SET_FRIEND_DATA, {data});
  },
  addFriend: (data: string) => {
    return createAction(ActionTypes.ADD_FRIEND, {data});
  },
  deleteFriend: (data: UpdateFollowRequestInput) => {
    return createAction(ActionTypes.DELETE_FRIEND, {data});
  },
  getMyFriends: () => {
    return createAction(ActionTypes.GET_MY_FRIENDS);
  },
  setMyFriendsIds: (data: string[]) => {
    return createAction(ActionTypes.SET_MY_FRIENDS_IDS, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
