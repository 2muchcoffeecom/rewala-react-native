import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const resetPasswordRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.RESET_PASSWORD),
  switchMap((action: ReturnType<typeof fromActions.Actions.resetPassword>) =>
    authService.resetPassword(action.payload.data).pipe(
      map((resp: FetchResult) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors.pop());

          return fromActions.Actions.resetPasswordFail(resp.errors.pop());
        } else {
          resolve(resp.data.resetPassword);

          return fromActions.Actions.resetPasswordSuccess(resp.data.resetPassword);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.resetPasswordFail(errors));
      }),
    ),
  ),
);