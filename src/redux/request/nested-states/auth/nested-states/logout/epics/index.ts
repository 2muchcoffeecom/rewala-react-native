import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const logoutRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.LOGOUT),
  switchMap((action: ReturnType<typeof fromActions.Actions.logout>) =>
    authService.logout().pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.logoutFail(resp.errors[0]);
        } else {

          return fromActions.Actions.logoutSuccess(resp.data.logout);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.logoutFail(errors));
      }),
    ),
  ),
);