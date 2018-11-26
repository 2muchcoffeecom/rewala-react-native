import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const registrationRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.REGISTRATION),
  switchMap((action: ReturnType<typeof fromActions.Actions.registration>) =>
    authService.registration(action.payload.data).pipe(
      map((resp: FetchResult) => {
        return resp.errors ?
          fromActions.Actions.registrationSuccess(resp.data) :
          fromActions.Actions.registrationFail(resp.errors);
      }),
      catchError((errors) => {
        return of(fromActions.Actions.registrationFail(errors));
      }),
    ),
  ),
);