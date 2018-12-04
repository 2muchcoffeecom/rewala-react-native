import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { FollowRequest } from '../../../../../../../shared/models/followRequest.model';
import { RequestError } from '../../../../../states';
import { UpdateFollowRequestInput } from '../../../../../../../shared/services/friend.service';

export enum ActionTypes {
  FRIEND_UPDATE_FOLLOW_REQUEST = 'FRIEND_UPDATE_FOLLOW_REQUEST',
  FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS = 'FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS',
  FRIEND_UPDATE_FOLLOW_REQUEST_FAIL = 'FRIEND_UPDATE_FOLLOW_REQUEST_FAIL',
}

export const Actions = {
  updateFriendFollowRequest: (data: UpdateFollowRequestInput) => createAction(
    ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST, {data},
  ),
  updateFriendFollowRequestSuccess: (data: FollowRequest) => {
    return createAction(ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS, {data});
  },
  updateFriendFollowRequestFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
