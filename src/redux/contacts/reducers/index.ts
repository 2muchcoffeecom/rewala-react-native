import * as fromActions from '../AC';
import { initialState, ContactsState } from '../states';

export function reducer(state = initialState, action: fromActions.Actions): ContactsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_CONTACTS_USER_ID: {
      const {data} = action.payload;

      return {
        contactsUsersIds: data,
      };
    }

    case fromActions.ActionTypes.DELETE_CONTACTS_USER_ID: {

      return {
        contactsUsersIds: null,
      };
    }

    default:
      return state;
  }
}