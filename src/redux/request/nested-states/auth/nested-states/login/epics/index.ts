import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const loginRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.LOGIN),
  switchMap((action: ReturnType<typeof fromActions.Actions.login>) =>
    authService.login(action.payload.data).pipe(
      map((resp: FetchResult) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors.pop());

          return fromActions.Actions.loginFail(resp.errors.pop());
        } else {
          resolve(resp.data.login);

          return fromActions.Actions.loginSuccess(resp.data.login);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.loginFail(errors));
      }),
    ),
  ),
);