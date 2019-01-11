import { RequestNestedState } from '../../../states';

export const initialState: RequestNestedState = {
  loading: false,
  loaded: false,
  pagedOptions: undefined,
  errors: null,
  data: null,
};
