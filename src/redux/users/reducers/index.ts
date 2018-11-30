import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, FriendsState } from '../states';

export function reducer(state = initialState, action: fromActions.Actions): FriendsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_USERS_DATA: {
      const {data} = action.payload;

      return {
        ...state,
        entities: unionBy(data, state.entities, 'recordID'),
      };
    }

    default:
      return state;
  }
}