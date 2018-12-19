import { initialState as getMeState } from '../nested-states/getMe/states';
import { initialState as updateMeState } from '../nested-states/updateMe/states';
import { initialState as searchState } from '../nested-states/search/states';

import { UserModel } from '../../../../../shared/models/user.model';
import { PagedUserModel } from '../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | UserModel | PagedUserModel;
}

export interface UsersRequestState {
  getMe: RequestNestedState;
  updateMe: RequestNestedState;
  search: RequestNestedState;
}

export const initialState: UsersRequestState = {
  getMe: getMeState,
  updateMe: updateMeState,
  search: searchState,
};