import { initialState as getMeState } from '../nested-states/getMe/states';

import { UserModel } from '../../../../../shared/models/user.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | UserModel;
}

export interface UsersRequestState {
  getMe: RequestNestedState;
}

export const initialState: UsersRequestState = {
  getMe: getMeState,
};