import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const newPasswordRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.NEW_PASSWORD),
  switchMap((action: ReturnType<typeof fromActions.Actions.newPassword>) =>
    authService.newPassword(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors[0]);

          return fromActions.Actions.newPasswordFail(resp.errors[0]);
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