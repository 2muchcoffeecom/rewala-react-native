import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import userService from '../../../../../../../shared/services/user.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const newSearchRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.NEW_SEARCH),
  switchMap((action: ReturnType<typeof fromActions.Actions.newSearch>) => {
      const {data} = action.payload;
      return userService.search(
        data.fullName,
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.newSearchFail(resp.errors[0]);
          } else {

            return fromActions.Actions.newSearchSuccess(resp.data.search);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.newSearchFail(errors));
        }),
      );
    },
  ),
);

export const newSearchPageRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.NEW_SEARCH_PAGE),
  switchMap((action: ReturnType<typeof fromActions.Actions.newSearchPage>) => {
      const {data} = action.payload;
      return userService.search(
        data.fullName,
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.newSearchPageFail(resp.errors[0]);
          } else {

            return fromActions.Actions.newSearchPageSuccess(resp.data.search);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.newSearchPageFail(errors));
        }),
      );
    },
  ),
);