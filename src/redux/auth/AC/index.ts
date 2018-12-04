import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput, UserInput, ResetPasswordConfirmInput } from '../../../shared/services/auth.service';
import { Reject, Resolve } from '../../request/states';
import { UserResponse } from '../../../shared/models/user.model';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
  AUTH_SUBMIT_REGISTRATION = 'AUTH_SUBMIT_REGISTRATION',
  AUTH_SUBMIT_RESET_PASSWORD = 'AUTH_SUBMIT_RESET_PASSWORD',
  AUTH_SUBMIT_RESET_PASSWORD_CODE = 'AUTH_SUBMIT_RESET_PASSWORD_CODE',
  AUTH_SUBMIT_NEW_PASSWORD = 'AUTH_SUBMIT_NEW_PASSWORD',
  SET_AUTHORIZED_USER_ID = 'SET_AUTHORIZED_USER_ID',
}

export const Actions = {
  submitLogin: (data: LoginInput, resolve: Resolve<UserResponse>, reject: Reject) => {
    return createAction(ActionTypes.AUTH_SUBMIT_LOGIN, {data, resolve, reject});
  },
  submitRegistration: (data: UserInput, resolve: Resolve<UserResponse>, reject: Reject) => {
    return createAction(ActionTypes.AUTH_SUBMIT_REGISTRATION, {data, resolve, reject});
  },
  submitResetPassword: (data: string, resolve?: Resolve<boolean>, reject?: Reject) => {
    return createAction(ActionTypes.AUTH_SUBMIT_RESET_PASSWORD, {data, resolve, reject});
  },
  submitResetPasswordCode: (data: string, resolve: Resolve<boolean>, reject: Reject) => {
    return createAction(ActionTypes.AUTH_SUBMIT_RESET_PASSWORD_CODE, {data, resolve, reject});
  },
  submitNewPassword: (data: ResetPasswordConfirmInput, resolve: Resolve<UserResponse>, reject: Reject) => {
    return createAction(ActionTypes.AUTH_SUBMIT_NEW_PASSWORD, {data, resolve, reject});
  },
  setAuthorizedUserId: (data: string) => {
    return createAction(ActionTypes.SET_AUTHORIZED_USER_ID, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
