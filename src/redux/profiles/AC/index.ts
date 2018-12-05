import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { UserResponse } from '../../../shared/models/user.model';

export enum ActionTypes {
  SET_PROFILES_DATA = 'SET_PROFILES_DATA',
}

export const Actions = {
  setProfilesData: (data: UserResponse[]) => {
    return createAction(ActionTypes.SET_PROFILES_DATA, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
