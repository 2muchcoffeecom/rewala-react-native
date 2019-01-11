import { initialState as getMeState } from '../nested-states/getMe/states';
import { initialState as updateMeState } from '../nested-states/updateMe/states';
import { initialState as searchState } from '../nested-states/search/states';
import { initialState as userFriendsState } from '../nested-states/userFriends/states';

import { UserModel } from '../../../../../shared/models/user.model';
import { PagedOptions, RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | UserModel | UserModel[];
  pagedOptions?: PagedOptions;
}

export interface UsersRequestState {
  getMe: RequestNestedState;
  updateMe: RequestNestedState;
  search: RequestNestedState;
  userFriends: RequestNestedState;
}

export const initialState: UsersRequestState = {
  getMe: getMeState,
  updateMe: updateMeState,
  search: searchState,
  userFriends: userFriendsState,
};