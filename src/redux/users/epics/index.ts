import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { contactsRequestAC } from '../../request/nested-states/contacts/AC';

const setUsersDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
  ),
  map((action) => {
    const users = action.payload.data;

    return fromActions.Actions.setUserData(users);
  }),
);

export const usersEpics = [
  setUsersDataEpic,
];