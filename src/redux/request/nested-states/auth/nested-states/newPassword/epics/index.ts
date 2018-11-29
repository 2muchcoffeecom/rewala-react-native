import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const newPasswordRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.NEW_PASSWORD),
  switchMap((action: ReturnType<typeof fromActions.Actions.newPassword>) =>
    authService.newPassword(action.payload.data).pipe(
      map((resp: FetchResult) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors.pop());

          return fromActions.Actions.newPasswordFail(resp.errors.pop());
        } else {
          resolve(resp.data.resetPasswordConfirm);

          return fromActions.Actions.newPasswordSuccess(resp.data.resetPasswordConfirm);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.newPasswordFail(errors));
      }),
    ),
  ),
);