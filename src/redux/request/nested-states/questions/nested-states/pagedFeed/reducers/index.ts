import * as fromActions from '../AC';
import { initialState } from '../states';
import { RequestNestedState } from '../../../states';

export function reducer(state = initialState, action: fromActions.Actions): RequestNestedState {

  switch (action.type) {
    case fromActions.ActionTypes.PAGED_FEED_REQUEST_FIRST:
      return {
        ...state,
        loading: true,
        isLoadingFirstPage: true,
        loaded: false,
        isLoadedNextPage: false,
        isLoadedFirstPage: false,
        data: null,
        errors: null,
      };

    case fromActions.ActionTypes.PAGED_FEED_REQUEST_NEXT:
      return {
        ...state,
        loading: true,
        isLoadingNextPage: true,
        loaded: false,
        isLoadedNextPage: false,
        isLoadedFirstPage: false,
        data: null,
        errors: null,
      };

    case fromActions.ActionTypes.PAGED_FEED_REQUEST_FIRST_SUCCESS: {
      const {data} = action.payload;

      return {
        ...state,
        loading: false,
        isLoadingFirstPage: false,
        loaded: true,
        isLoadedFirstPage: true,
        pagedOptions: {
          hasNext: data.hasNext,
          next: data.next,
          hasPrevious: data.hasPrevious,
          previous: data.previous,
        },
        data: data.results,
      };
    }

    case fromActions.ActionTypes.PAGED_FEED_REQUEST_NEXT_SUCCESS: {
      const {data} = action.payload;

      return {
        ...state,
        loading: false,
        isLoadingNextPage: false,
        loaded: true,
        isLoadedNextPage: true,
        pagedOptions: {
          hasNext: data.hasNext,
          next: data.next,
          hasPrevious: data.hasPrevious,
          previous: data.previous,
        },
        data: data.results,
      };
    }

    case fromActions.ActionTypes.PAGED_FEED_REQUEST_FIRST_FAIL:
    case fromActions.ActionTypes.PAGED_FEED_REQUEST_NEXT_FAIL: {
      const {payload} = action;

      return {
        ...state,
        loading: false,
        isLoadingFirstPage: false,
        isLoadingNextPage: false,
        errors: payload.errors,
      };
    }

    default:
      return state;
  }
}