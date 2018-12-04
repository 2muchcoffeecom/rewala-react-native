import { initialState as sendContactsState } from '../nested-states/sendContacts/states';

import { UserModel } from '../../../../../shared/models/user.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | UserModel[];
}

export interface ContactsRequestState {
  sendContacts: RequestNestedState;
}

export const initialState: ContactsRequestState = {
  sendContacts: sendContactsState,
};