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

    case fromActions.ActionTypes.SET_PAGED_USERS_IDS: {
      const pagedUsersIds = action.payload.data.results.map<string>((user) => user._id);

      return {
        ...state,
        pagedUsersIds: [...state.pagedUsersIds, ...pagedUsersIds],
      };
    }

    case fromActions.ActionTypes.DELETE_PAGED_USERS_IDS: {
      return {
        ...state,
        pagedUsersIds: [],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_USERS_OPTIONS: {
      const {data} = action.payload;

      return {
        ...state,
        pagedUsersOptions: {
          hasNext: data.hasNext,
          next: data.next,
          hasPrevious: data.hasPrevious,
          previous: data.previous,
        },
      };
    }

    default:
      return state;
  }
}