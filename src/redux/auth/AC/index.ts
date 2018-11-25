import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { LoginInput } from '../../../shared/services/auth.service';

export enum ActionTypes {
  AUTH_SUBMIT_LOGIN = 'AUTH_SUBMIT_LOGIN',
}

export const Actions = {
  submitLogin: (data: LoginInput) => {
    return createAction(ActionTypes.AUTH_SUBMIT_LOGIN, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
