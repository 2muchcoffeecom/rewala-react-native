import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, UsersState } from '../states';

export function reducer(state = initialState, action: fromActions.Actions): UsersState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_USERS_DATA: {
      const {data} = action.payload;

      return {
        ...state,
        entities: unionBy(data, state.entities, '_id'),
      };
    }

    default:
      return state;
  }
}