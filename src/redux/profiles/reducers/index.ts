import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, ProfilesState } from '../states';
import { ProfileModel } from '../../../shared/models/profile.model';

export function reducer(state = initialState, action: fromActions.Actions): ProfilesState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_PROFILES_DATA: {
      const profilesFromAction = action.payload.data.map<ProfileModel>((user) => new ProfileModel(user));

      const entities = unionBy(state.entities, profilesFromAction, '_id');
      const newEntities = entities.map<ProfileModel>((entity) => {
        const newProfile = profilesFromAction.find(profileFromAction => profileFromAction._id === entity._id);

        return newProfile ? Object.assign({}, entity, newProfile) : entity;
      });

      return {
        ...state,
        entities: newEntities,
      };
    }

    default:
      return state;
  }
}