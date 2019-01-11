import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedFeedRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_FEED_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedFeed>) => {
      const {data} = action.payload;
      return questionService.pagedFeed(
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedFeedFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedFeedSuccess(resp.data.feedQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedFeedFail(errors));
        }),
      );
    },
  ),
);