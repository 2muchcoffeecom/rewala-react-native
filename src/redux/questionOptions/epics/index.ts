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
  ofType<ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedNextSuccess> |
    ReturnType<typeof questionsRequestAC.pagedMe.Actions.pagedMeFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedMe.Actions.pagedMeNextSuccess> |
    ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserNextSuccess>>(
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_NEXT_SUCCESS,
    questionsRequestAC.pagedMe.ActionTypes.PAGED_ME_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedMe.ActionTypes.PAGED_ME_REQUEST_NEXT_SUCCESS,
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_NEXT_SUCCESS,
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