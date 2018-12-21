import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserResponse } from '../../../../../../../shared/models/user.model';
import { RequestError} from '../../../../../states';

export enum ActionTypes {
  GET_USER_FRIENDS = 'GET_USER_FRIENDS',
  GET_USER_FRIENDS_SUCCESS = 'GET_USER_FRIENDS_SUCCESS',
  GET_USER_FRIENDS_FAIL = 'GET_USER_FRIENDS_FAIL',
}

export const Actions = {
  getUserFriends: (data?: string) => createAction(ActionTypes.GET_USER_FRIENDS, {data}),
  getUserFriendsSuccess: (data: UserResponse[]) => {
    return createAction(ActionTypes.GET_USER_FRIENDS_SUCCESS, {data});
  },
  getUserFriendsFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.GET_USER_FRIENDS_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
