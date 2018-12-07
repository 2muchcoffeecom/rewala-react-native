import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import authService from '../../../../../../../shared/services/auth.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const registrationRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.REGISTRATION),
  switchMap((action: ReturnType<typeof fromActions.Actions.registration>) =>
    authService.registration(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject(resp.errors.pop());

          return fromActions.Actions.registrationFail(resp.errors[0]);
        } else {
          resolve(resp.data.registration);

          return fromActions.Actions.registrationSuccess(resp.data.registration);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.registrationFail(errors));
      }),
    ),
  ),
);