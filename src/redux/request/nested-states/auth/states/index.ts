import { initialState as loginState } from '../nested-states/login/states';

import { UserModel } from '../../../../../shared/models/user.model';
import {RequestError} from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | null;
  data: UserModel | null;
}

export interface AuthRequestState {
  login: RequestNestedState;
}

export const initialState: AuthRequestState = {
  login: loginState,
};