import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedFeedFirstRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_FEED_REQUEST_FIRST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedFeedFirst>) => {
      const {data} = action.payload;
      return questionService.pagedFeed(data.limit).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedFeedFirstFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedFeedFirstSuccess(resp.data.feedQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedFeedFirstFail(errors));
        }),
      );
    },
  ),
);

export const pagedFeedNextRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_FEED_REQUEST_NEXT),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedFeedNext>) => {
      const {data} = action.payload;
      return questionService.pagedFeed(
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedFeedNextFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedFeedNextSuccess(resp.data.feedQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedFeedNextFail(errors));
        }),
      );
    },
  ),
);