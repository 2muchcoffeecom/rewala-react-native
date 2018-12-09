import { initialState as createFollowRequestState } from '../nested-states/create/states';
import { initialState as updateFollowRequestState } from '../nested-states/update/states';
import { initialState as getMyFriendsFollowRequestState } from '../nested-states/getMyFriends/states';

import { FollowRequest } from '../../../../../shared/models/followRequest.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | FollowRequest[] | FollowRequest;
}

export interface FriendsRequestState {
  create: RequestNestedState;
  update: RequestNestedState;
  getMyFriends: RequestNestedState;
}

export const initialState: FriendsRequestState = {
  create: createFollowRequestState,
  update: updateFollowRequestState,
  getMyFriends: getMyFriendsFollowRequestState,
};