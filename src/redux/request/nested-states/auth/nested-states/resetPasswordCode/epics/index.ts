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
    authService.resetPasswordConfirmCode(action.payload.data).pipe(
      map((resp: FetchResult) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors.pop());

          return fromActions.Actions.resetPasswordCodeFail(resp.errors.pop());
        } else {
          resolve(resp.data.resetPasswordConfirmCode);

          return fromActions.Actions.resetPasswordCodeSuccess(resp.data.resetPasswordConfirmCode);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.resetPasswordCodeFail(errors));
      }),
    ),
  ),
);