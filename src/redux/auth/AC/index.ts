import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput, UserInput } from '../../../shared/services/auth.service';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
  AUTH_SUBMIT_REGISTRATION = 'AUTH_SUBMIT_REGISTRATION',
  AUTH_SUBMIT_FORGOT_PASSWORD = 'AUTH_SUBMIT_FORGOT_PASSWORD',
  AUTH_SUBMIT_RESET_PASSWORD_CODE = 'AUTH_SUBMIT_RESET_PASSWORD_CODE',
}

export const Actions = {
  submitLogin: (data: LoginInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_LOGIN, {data});
  },
  submitRegistration: (data: UserInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_REGISTRATION, {data});
  },
  submitForgotPassword: (data: string) => {
    return createAction(ActionTypes.AUTH_SUBMIT_FORGOT_PASSWORD, {data});
  },
  submitResetPasswordCode: (data: string) => {
    return createAction(ActionTypes.AUTH_SUBMIT_RESET_PASSWORD_CODE, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
