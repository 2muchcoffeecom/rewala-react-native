import { initialState as loginState } from '../nested-states/login/states';
import { initialState as registrationState } from '../nested-states/registration/states';
import { initialState as resetPasswordState } from '../nested-states/resetPassword/states';
import { initialState as resetPasswordCodeState } from '../nested-states/resetPasswordCode/states';
import { initialState as newPasswordState } from '../nested-states/newPassword/states';
import { initialState as changePasswordState } from '../nested-states/changePassword/states';

import { UserModelWithToken } from '../../../../../shared/models/user.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | null;
  data: UserModelWithToken | boolean | null;
}

export interface AuthRequestState {
  login: RequestNestedState;
  registration: RequestNestedState;
  resetPassword: RequestNestedState;
  resetPasswordCode: RequestNestedState;
  newPassword: RequestNestedState;
  changePassword: RequestNestedState;
}

export const initialState: AuthRequestState = {
  login: loginState,
  registration: registrationState,
  resetPassword: resetPasswordState,
  resetPasswordCode: resetPasswordCodeState,
  newPassword: newPasswordState,
  changePassword: changePasswordState,
};