import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import contactsService from '../../../../../../../shared/services/contacts.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const contactsSendRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.CONTACTS_SEND),
  switchMap((action: ReturnType<typeof fromActions.Actions.contactsSend>) =>
    contactsService.sendContactsToServer(action.payload.data).pipe(
      map((resp: FetchResult) => {
        if (resp.errors) {

          return fromActions.Actions.contactsSendFail(resp.errors.pop());
        } else {

          return fromActions.Actions.contactsSendSuccess(resp.data.importContacts);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.contactsSendFail(errors));
      }),
    ),
  ),
);