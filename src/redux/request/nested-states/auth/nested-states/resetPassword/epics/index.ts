import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const resetPasswordRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.RESET_PASSWORD),
  switchMap((action: ReturnType<typeof fromActions.Actions.resetPassword>) =>
    authService.resetPassword(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject && reject(resp.errors.pop());

          return fromActions.Actions.resetPasswordFail(resp.errors[0]);
        } else {
          resolve && resolve(resp.data.resetPassword);

          return fromActions.Actions.resetPasswordSuccess(resp.data.resetPassword);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.resetPasswordFail(errors));
      }),
    ),
  ),
);