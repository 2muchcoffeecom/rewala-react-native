import * as fromActions from '../AC';
import { initialState } from '../states';
import { RequestNestedState } from '../../../states';

export function reducer(state = initialState, action: fromActions.Actions): RequestNestedState {

  switch (action.type) {
    case fromActions.ActionTypes.NEW_SEARCH:
    case fromActions.ActionTypes.NEW_SEARCH_PAGE:
      return {
        loading: true,
        loaded: false,
        errors: null,
        data: null,
      };

    case fromActions.ActionTypes.NEW_SEARCH_SUCCESS:
    case fromActions.ActionTypes.NEW_SEARCH_PAGE_SUCCESS: {
      const {data} = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        pagedOptions: {
          hasNext: data.hasNext,
          next: data.next,
          hasPrevious: data.hasPrevious,
          previous: data.previous,
        },
        data: data.results,
      };
    }

    case fromActions.ActionTypes.NEW_SEARCH_FAIL:
    case fromActions.ActionTypes.NEW_SEARCH_PAGE_FAIL: {
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