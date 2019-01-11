import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedOfUserFirstRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_OF_USER_REQUEST_FIRST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedOfUserFirst>) => {
      const {data} = action.payload;
      return questionService.pagedOfUser(
        data.id,
        data.limit,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedOfUserFirstFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedOfUserFirstSuccess(resp.data.personQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedOfUserFirstFail(errors));
        }),
      );
    },
  ),
);

export const pagedOfUserNextRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_OF_USER_REQUEST_NEXT),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedOfUserNext>) => {
      const {data} = action.payload;
      return questionService.pagedOfUser(
        data.id,
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedOfUserNextFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedOfUserNextSuccess(resp.data.personQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedOfUserNextFail(errors));
        }),
      );
    },
  ),
);