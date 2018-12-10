import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import userService from '../../../../../../../shared/services/user.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const GetMeRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.GET_ME),
  switchMap(() =>
    userService.getMe().pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.getMeFail(resp.errors[0]);
        } else {

          return fromActions.Actions.getMeSuccess(resp.data.me);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.getMeFail(errors));
      }),
    ),
  ),
);