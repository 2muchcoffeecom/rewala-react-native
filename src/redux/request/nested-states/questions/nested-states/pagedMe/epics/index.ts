import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedMeFirstRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_ME_REQUEST_FIRST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedMeFirst>) => {
      const {data} = action.payload;
      return questionService.pagedMy(data.limit).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedMeFirstFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedMeFirstSuccess(resp.data.myQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedMeFirstFail(errors));
        }),
      );
    },
  ),
);

export const pagedMeNextRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_ME_REQUEST_NEXT),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedMeNext>) => {
      const {data} = action.payload;
      return questionService.pagedMy(
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedMeNextFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedMeNextSuccess(resp.data.myQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedMeNextFail(errors));
        }),
      );
    },
  ),
);