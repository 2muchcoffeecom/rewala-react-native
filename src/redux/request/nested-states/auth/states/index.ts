import { initialState as loginState } from '../nested-states/login/states';
import { initialState as registrationState } from '../nested-states/registration/states';

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
  registration: RequestNestedState;
}

export const initialState: AuthRequestState = {
  login: loginState,
  registration: registrationState,
};