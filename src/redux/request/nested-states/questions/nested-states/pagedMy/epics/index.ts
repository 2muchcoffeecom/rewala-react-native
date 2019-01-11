import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedMyRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_MY_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedMy>) => {
      const {data} = action.payload;
      return questionService.pagedMy(
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedMyFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedMySuccess(resp.data.myQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedMyFail(errors));
        }),
      );
    },
  ),
);