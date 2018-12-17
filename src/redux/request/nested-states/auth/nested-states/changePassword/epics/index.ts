import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const changePasswordRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.CHANGE_PASSWORD),
  switchMap((action: ReturnType<typeof fromActions.Actions.changePassword>) =>
    authService.changePassword(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject && reject(resp.errors[0]);

          return fromActions.Actions.changePasswordFail(resp.errors[0]);
        } else {
          resolve && resolve(resp.data.changePassword);

          return fromActions.Actions.changePasswordSuccess(resp.data.changePassword);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.changePasswordFail(errors));
      }),
    ),
  ),
);