import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { FollowRequestResponse } from '../../../../../../../shared/models/followRequest.model';
import { RequestError } from '../../../../../states';

export enum ActionTypes {
  FRIEND_GET_MY_FOLLOW_REQUEST = 'FRIEND_GET_MY_FOLLOW_REQUEST',
  FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS = 'FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS',
  FRIEND_GET_MY_FOLLOW_REQUEST_FAIL = 'FRIEND_GET_MY_FOLLOW_REQUEST_FAIL',
}

export const Actions = {
  getMyFriendFollowRequest: () => createAction(ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST),
  getMyFriendFollowRequestSuccess: (data: FollowRequestResponse[]) => {
    return createAction(ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS, {data});
  },
  getMyFriendFollowRequestFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
