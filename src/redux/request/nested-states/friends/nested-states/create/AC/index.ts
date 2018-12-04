import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { FollowRequest } from '../../../../../../../shared/models/followRequest.model';
import { RequestError } from '../../../../../states';

export enum ActionTypes {
  FRIEND_CREATE_FOLLOW_REQUEST = 'FRIEND_CREATE_FOLLOW_REQUEST',
  FRIEND_CREATE_FOLLOW_REQUEST_SUCCESS = 'FRIEND_CREATE_FOLLOW_REQUEST_SUCCESS',
  FRIEND_CREATE_FOLLOW_REQUEST_FAIL = 'FRIEND_CREATE_FOLLOW_REQUEST_FAIL',
}

export const Actions = {
  createFriendFollowRequest: (data: string) => createAction(ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST, {data}),
  createFriendFollowRequestSuccess: (data: FollowRequest) => {
    return createAction(ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST_SUCCESS, {data});
  },
  createFriendFollowRequestFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
