import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, UsersState } from '../states';
import { UserModel } from '../../../shared/models/user.model';

export function reducer(state = initialState, action: fromActions.Actions): UsersState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_USERS_DATA: {
      const users = action.payload.data.map<UserModel>((user) => new UserModel(user));

      return {
        ...state,
        entities: unionBy(users, state.entities, '_id'),
      };
    }

    default:
      return state;
  }
}