import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { IUserModel } from '../../../../../../../shared/models/user.model';
import { RequestError, Reject, Resolve } from '../../../../../states';
import { LoginInput } from '../../../../../../../shared/services/auth.service';

export enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
}

export const Actions = {
  login: (data: LoginInput, resolve: Resolve<IUserModel>, reject: Reject) => createAction(
    ActionTypes.LOGIN, {data, resolve, reject},
  ),
  loginSuccess: (data: IUserModel) => {
    return createAction(ActionTypes.LOGIN_SUCCESS, {data});
  },
  loginFail: (errors: RequestError) => {
    return createAction(ActionTypes.LOGIN_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
