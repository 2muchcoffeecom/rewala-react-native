import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const resetPasswordCodeRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.RESET_PASSWORD_CODE),
  switchMap((action: ReturnType<typeof fromActions.Actions.resetPasswordCode>) =>
    authService.resetPassword(action.payload.data).pipe(
      map((resp: FetchResult) => {
        return !resp.errors ?
          fromActions.Actions.resetPasswordCodeSuccess(resp.data.resetPassword) :
          fromActions.Actions.resetPasswordCodeFail(resp.errors.pop());
      }),
      catchError((errors) => {
        return of(fromActions.Actions.resetPasswordCodeFail(errors));
      }),
    ),
  ),
);