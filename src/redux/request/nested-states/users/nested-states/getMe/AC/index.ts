import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserResponse } from '../../../../../../../shared/models/user.model';
import { RequestError } from '../../../../../states';

export enum ActionTypes {
  GET_ME = 'GET_ME',
  GET_ME_SUCCESS = 'GET_ME_SUCCESS',
  GET_ME_FAIL = 'GET_ME_FAIL',
}

export const Actions = {
  getMe: () => createAction(ActionTypes.GET_ME),
  getMeSuccess: (data: UserResponse) => {
    return createAction(ActionTypes.GET_ME_SUCCESS, {data});
  },
  getMeFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.GET_ME_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
