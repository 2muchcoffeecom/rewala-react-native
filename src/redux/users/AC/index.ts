import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { UserResponse } from '../../../shared/models/user.model';

export enum ActionTypes {
  SET_USERS_DATA = 'SET_USERS_DATA',
}

export const Actions = {
  setUsersData: (data: UserResponse[]) => {
    return createAction(ActionTypes.SET_USERS_DATA, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
