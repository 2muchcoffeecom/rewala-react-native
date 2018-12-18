import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { RequestError } from '../../../../../states';

export enum ActionTypes {
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'LOGOUT_FAIL',
}

export const Actions = {
  logout: () => createAction(ActionTypes.LOGOUT),
  logoutSuccess: (data: boolean) => {
    return createAction(ActionTypes.LOGOUT_SUCCESS, {data});
  },
  logoutFail: (errors: RequestError) => {
    return createAction(ActionTypes.LOGOUT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
