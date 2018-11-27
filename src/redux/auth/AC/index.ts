import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput, UserInput } from '../../../shared/services/auth.service';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
  AUTH_SUBMIT_REGISTRATION = 'AUTH_SUBMIT_REGISTRATION',
  AUTH_SUBMIT_FORGOT_PASSWORD = 'AUTH_SUBMIT_FORGOT_PASSWORD',
  AUTH_SUBMIT_VERIFICATION_CODE = 'AUTH_SUBMIT_VERIFICATION_CODE',
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
  submitVerificationCode: (data: string) => {
    return createAction(ActionTypes.AUTH_SUBMIT_VERIFICATION_CODE, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
