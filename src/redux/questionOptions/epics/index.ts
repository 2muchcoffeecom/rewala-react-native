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

const setQuestionOptionsDataFromPagedQuestionsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedSuccess> |
    ReturnType<typeof questionsRequestAC.pagedMy.Actions.pagedMySuccess> |
    ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserSuccess>>(
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_SUCCESS,
    questionsRequestAC.pagedMy.ActionTypes.PAGED_MY_REQUEST_SUCCESS,
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_SUCCESS,
  ),
  map((action) => {
    const questions = action.payload.data.results;

    return fromActions.Actions.setQuestionOptionsData(questions);
  }),
);

export const questionOptionsEpics = [
  setQuestionOptionsDataEpic,
  setQuestionOptionsDataFromPagedQuestionsEpic,
];