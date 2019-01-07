import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { questionsRequestAC } from '../../request/AC';

const setQuestionsDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.createQuestion.Actions.createQuestionSuccess>>(
    questionsRequestAC.createQuestion.ActionTypes.CREATE_QUESTION_SUCCESS,
  ),
  map((action) => {
    const questions = Array.isArray(action.payload.data) ?
      action.payload.data :
      [action.payload.data];

    return fromActions.Actions.setQuestionsData(questions);
  }),
);

const createQuestionEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.SUBMIT_CREATE_QUESTION,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitCreateQuestion>) => {
    const {data, resolve, reject} = action.payload;

    return questionsRequestAC.createQuestion.Actions.createQuestion(data, resolve, reject);
  }),
);

export const questionsEpics = [
  setQuestionsDataEpic,
  createQuestionEpic,
];