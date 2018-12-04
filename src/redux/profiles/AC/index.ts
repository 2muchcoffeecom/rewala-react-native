import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { ProfileModel } from '../../../shared/models/profile.model';

export enum ActionTypes {
  SET_PROFILES_DATA = 'SET_PROFILES_DATA',
}

export const Actions = {
  setProfilesData: (data: ProfileModel[]) => {
    return createAction(ActionTypes.SET_PROFILES_DATA, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
