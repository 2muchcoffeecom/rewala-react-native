import * as fromActions from '../AC';
import { initialState, AuthState } from '../states';

export function reducer(state = initialState, action: fromActions.Actions): AuthState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_AUTHORIZED_USER_ID: {
      const {data} = action.payload;

      return {
        authorizedUserId: data,
      };
    }

    case fromActions.ActionTypes.DELETE_AUTHORIZED_USER_ID: {

      return {
        authorizedUserId: '',
      };
    }

    default:
      return state;
  }
}