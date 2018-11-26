import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput, UserInput } from '../../../shared/services/auth.service';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
  AUTH_SUBMIT_REGISTRATION = 'AUTH_SUBMIT_REGISTRATION',
}

export const Actions = {
  submitLogin: (data: LoginInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_LOGIN, {data});
  },
  submitRegistration: (data: UserInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_REGISTRATION, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
