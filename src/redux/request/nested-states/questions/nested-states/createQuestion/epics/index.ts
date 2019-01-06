import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import questionService from '../../../../../../../shared/services/question.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const createQuestionRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.CREATE_QUESTION),
  switchMap((action: ReturnType<typeof fromActions.Actions.createQuestion>) =>
    questionService.createQuestion(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        const {resolve, reject} = action.payload;

        if (resp.errors) {
          reject && reject(resp.errors[0]);

          return fromActions.Actions.createQuestionFail(resp.errors[0]);
        } else {
          resolve && resolve(resp.data.createQuestion);

          return fromActions.Actions.createQuestionSuccess(resp.data.createQuestion);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.createQuestionFail(errors));
      }),
    ),
  ),
);