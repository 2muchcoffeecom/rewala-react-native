import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { UserResponse } from '../../../shared/models/user.model';
import { UpdateUserInput } from '../../../shared/services/user.service';
import { Reject, Resolve } from "../../request/states";

export enum ActionTypes {
  SET_USERS_DATA = 'SET_USERS_DATA',
  GET_AUTHORIZED_USER = 'GET_AUTHORIZED_USER',
  UPDATE_AUTHORIZED_USER = 'UPDATE_AUTHORIZED_USER',
}

export const Actions = {
  setUsersData: (data: UserResponse[]) => {
    return createAction(ActionTypes.SET_USERS_DATA, {data});
  },
  getAuthorizedUser: () => {
    return createAction(ActionTypes.GET_AUTHORIZED_USER);
  },
  updateAuthorizedUser: (data: UpdateUserInput, resolve?: Resolve<UserResponse>, reject?: Reject) => {
    return createAction(ActionTypes.GET_AUTHORIZED_USER, {data, resolve, reject});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
