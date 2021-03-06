import * as fromActions from '../AC';
import { initialState } from '../states';
import { RequestNestedState } from '../../../states';

export function reducer(state = initialState, action: fromActions.Actions): RequestNestedState {

  switch (action.type) {
    case fromActions.ActionTypes.CONTACTS_SEND:
      return {
        loading: true,
        loaded: false,
        errors: null,
        data: null,
      };

    case fromActions.ActionTypes.CONTACTS_SEND_SUCCESS: {
      const {payload} = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        data: payload.data,
      };
    }

    case fromActions.ActionTypes.CONTACTS_SEND_FAIL: {
      const {payload} = action;

      return {
        ...state,
        loading: false,
        errors: payload.errors,
      };
    }

    default:
      return state;
  }
}