import { ProfileModel } from '../../../shared/models/profile.model';

export interface ProfilesState {
  entities: ProfileModel[];
}

export const initialState: ProfilesState = {
  entities: [],
};