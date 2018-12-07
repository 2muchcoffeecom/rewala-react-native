import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import contactsService from '../../../../../../../shared/services/contacts.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const contactsSendRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.CONTACTS_SEND),
  switchMap((action: ReturnType<typeof fromActions.Actions.contactsSend>) =>
    contactsService.sendContactsToServer(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.contactsSendFail(resp.errors[0]);
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