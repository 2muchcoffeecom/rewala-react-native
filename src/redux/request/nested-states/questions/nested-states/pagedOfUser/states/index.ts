import { RequestNestedState } from '../../../states';

export const initialState: RequestNestedState = {
  loading: false,
  isLoadingFirstPage: false,
  isLoadingNextPage: false,
  loaded: false,
  isLoadedFirstPage: false,
  isLoadedNextPage: false,
  pagedOptions: undefined,
  errors: null,
  data: null,
};
