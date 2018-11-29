import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { Reject, RequestError, Resolve } from '../../../../../states';
import { IUserModel } from '../../../../../../../shared/models/user.model';

export enum ActionTypes {
  RESET_PASSWORD_CODE = 'RESET_PASSWORD_CODE',
  RESET_PASSWORD_CODE_SUCCESS = 'RESET_PASSWORD_CODE_SUCCESS',
  RESET_PASSWORD_CODE_FAIL = 'RESET_PASSWORD_CODE_FAIL',
}

export const Actions = {
  resetPasswordCode: (
    data: string, resolve: Resolve<IUserModel>, reject: Reject,
  ) => createAction(ActionTypes.RESET_PASSWORD_CODE, {data, resolve, reject}),
  resetPasswordCodeSuccess: (data: boolean) => {
    return createAction(ActionTypes.RESET_PASSWORD_CODE_SUCCESS, {data});
  },
  resetPasswordCodeFail: (errors: RequestError) => {
    return createAction(ActionTypes.RESET_PASSWORD_CODE_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
