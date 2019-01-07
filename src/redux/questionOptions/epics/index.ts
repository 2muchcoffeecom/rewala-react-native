import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { questionsRequestAC } from '../../request/AC';

const setQuestionOptionsDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.createQuestion.Actions.createQuestionSuccess>>(
    questionsRequestAC.createQuestion.ActionTypes.CREATE_QUESTION_SUCCESS,
  ),
  map((action) => {
    const questions = Array.isArray(action.payload.data) ?
      action.payload.data :
      [action.payload.data];

    return fromActions.Actions.setQuestionOptionsData(questions);
  }),
);

export const questionOptionsEpics = [
  setQuestionOptionsDataEpic,
];