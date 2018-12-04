import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, ProfilesState } from '../states';
import { ProfileModel } from '../../../shared/models/profile.model';

export function reducer(state = initialState, action: fromActions.Actions): ProfilesState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_PROFILES_DATA: {
      const profiles = action.payload.data.map<ProfileModel>((profile) => new ProfileModel(profile));

      return {
        ...state,
        entities: unionBy(profiles, state.entities, '_id'),
      };
    }

    default:
      return state;
  }
}