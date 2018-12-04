import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { FollowRequest } from '../../../shared/models/followRequest.model';
import { UpdateFollowRequestInput } from '../../../shared/services/friend.service';

export enum ActionTypes {
  SET_FRIEND_DATA = 'SET_FRIEND_DATA',
  ADD_FRIEND = 'ADD_FRIEND',
  DELETE_FRIEND = 'DELETE_FRIEND',
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
};

export type Actions = ActionsUnion<typeof Actions>;
