import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const pagedOfUserRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.PAGED_OF_USER_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.pagedOfUser>) => {
      const {data} = action.payload;
      return questionService.pagedOfUser(
        data.id,
        data.limit,
        data.next,
        data.previous,
      ).pipe(
        map((resp: GraphQlResponse) => {
          if (resp.errors) {

            return fromActions.Actions.pagedOfUserFail(resp.errors[0]);
          } else {

            return fromActions.Actions.pagedOfUserSuccess(resp.data.personQuestions);
          }
        }),
        catchError((errors) => {
          return of(fromActions.Actions.pagedOfUserFail(errors));
        }),
      );
    },
  ),
);