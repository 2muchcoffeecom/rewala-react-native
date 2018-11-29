import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { Reject, RequestError, Resolve } from '../../../../../states';
import { IUserModel } from '../../../../../../../shared/models/user.model';

export enum ActionTypes {
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL',
}

export const Actions = {
  resetPassword: (
    data: string, resolve: Resolve<IUserModel>, reject: Reject,
  ) => createAction(ActionTypes.RESET_PASSWORD, {data, resolve, reject}),
  resetPasswordSuccess: (data: boolean) => {
    return createAction(ActionTypes.RESET_PASSWORD_SUCCESS, {data});
  },
  resetPasswordFail: (errors: RequestError) => {
    return createAction(ActionTypes.RESET_PASSWORD_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
