import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import userService from '../../../../../../../shared/services/user.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const updateMeRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.UPDATE_ME),
  switchMap((action: ReturnType<typeof fromActions.Actions.updateMe>) =>
    userService.updateMe(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject && reject(resp.errors.pop());

          return fromActions.Actions.updateMeFail(resp.errors[0]);
        } else {
          resolve && resolve(resp.data.updateMe);

          return fromActions.Actions.updateMeSuccess(resp.data.updateMe);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.updateMeFail(errors));
      }),
    ),
  ),
);