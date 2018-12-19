import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import userService from '../../../../../../../shared/services/user.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const searchRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.SEARCH),
  switchMap((action: ReturnType<typeof fromActions.Actions.search>) => {
      const {data} = action.payload;
      return userService.search(
        data.fullName,
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          console.log('resp====', resp)
          if (resp.errors) {

            return fromActions.Actions.searchFail(resp.errors[0]);
          } else {

            return fromActions.Actions.searchSuccess(resp.data.search);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.searchFail(errors));
        }),
      );
    },
  ),
);