import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserResponse } from '../../../../../../../shared/models/user.model';
import { Reject, RequestError, Resolve } from '../../../../../states';
import { ChangePasswordInput } from '../../../../../../../shared/services/auth.service';

export enum ActionTypes {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL',
}

export const Actions = {
  changePassword: (
    data: ChangePasswordInput, resolve?: Resolve<UserResponse>, reject?: Reject,
  ) => createAction(ActionTypes.CHANGE_PASSWORD, {data, resolve, reject}),
  changePasswordSuccess: (data: UserResponse) => {
    return createAction(ActionTypes.CHANGE_PASSWORD_SUCCESS, {data});
  },
  changePasswordFail: (errors: RequestError) => {
    return createAction(ActionTypes.CHANGE_PASSWORD_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
