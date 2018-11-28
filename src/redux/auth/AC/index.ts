import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput, UserInput, ResetPasswordConfirmInput } from '../../../shared/services/auth.service';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
  AUTH_SUBMIT_REGISTRATION = 'AUTH_SUBMIT_REGISTRATION',
  AUTH_SUBMIT_RESET_PASSWORD = 'AUTH_SUBMIT_RESET_PASSWORD',
  AUTH_SUBMIT_RESET_PASSWORD_CODE = 'AUTH_SUBMIT_RESET_PASSWORD_CODE',
  AUTH_SUBMIT_NEW_PASSWORD = 'AUTH_SUBMIT_NEW_PASSWORD',
  SET_AUTHORIZED_USER_ID = 'SET_AUTHORIZED_USER_ID',
}

export const Actions = {
  submitLogin: (data: LoginInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_LOGIN, {data});
  },
  submitRegistration: (data: UserInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_REGISTRATION, {data});
  },
  submitResetPassword: (data: string) => {
    return createAction(ActionTypes.AUTH_SUBMIT_RESET_PASSWORD, {data});
  },
  submitResetPasswordCode: (data: string) => {
    return createAction(ActionTypes.AUTH_SUBMIT_RESET_PASSWORD_CODE, {data});
  },
  submitNewPassword: (data: ResetPasswordConfirmInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_NEW_PASSWORD, {data});
  },
  setAuthorizedUserId: (data: string) => {
    return createAction(ActionTypes.SET_AUTHORIZED_USER_ID, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
