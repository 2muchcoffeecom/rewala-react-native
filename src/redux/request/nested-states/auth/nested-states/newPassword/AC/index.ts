import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { IUserModel } from '../../../../../../../shared/models/user.model';
import { RequestError } from '../../../../../states';
import { ResetPasswordConfirmInput } from '../../../../../../../shared/services/auth.service';

export enum ActionTypes {
  NEW_PASSWORD = 'NEW_PASSWORD',
  NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS',
  NEW_PASSWORD_FAIL = 'NEW_PASSWORD_FAIL',
}

export const Actions = {
  newPassword: (data: ResetPasswordConfirmInput) => createAction(ActionTypes.NEW_PASSWORD, {data}),
  newPasswordSuccess: (data: IUserModel) => {
    return createAction(ActionTypes.NEW_PASSWORD_SUCCESS, {data});
  },
  newPasswordFail: (errors: RequestError) => {
    return createAction(ActionTypes.NEW_PASSWORD_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
