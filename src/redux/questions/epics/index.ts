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

const setQuestionsDataFromPagedQuestionsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedSuccess> |
    ReturnType<typeof questionsRequestAC.pagedMy.Actions.pagedMySuccess> |
    ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserSuccess>>(
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_SUCCESS,
    questionsRequestAC.pagedMy.ActionTypes.PAGED_MY_REQUEST_SUCCESS,
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_SUCCESS,
  ),
  map((action) => {
    const questions = action.payload.data.results;

    return fromActions.Actions.setQuestionsData(questions);
  }),
);

const setPagedQuestionsIdsFromFeedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedSuccess>>(
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    return fromActions.Actions.setPagedQuestionsIdsFromFeed(pagedQuestionsData);
  }),
);

const setPagedQuestionsIdsFromMeEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedMy.Actions.pagedMySuccess>>(
    questionsRequestAC.pagedMy.ActionTypes.PAGED_MY_REQUEST_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    return fromActions.Actions.setPagedQuestionsIdsFromMe(pagedQuestionsData);
  }),
);

const setPagedQuestionsIdsFromUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserSuccess>>(
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    return fromActions.Actions.setPagedQuestionsIdsFromUser(pagedQuestionsData);
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

const getPagedQuestionsFeedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_PAGED_QUESTIONS_FEED,
  ),
  map((action: ReturnType<typeof fromActions.Actions.getPagedQuestionsFeed>) => {
    const {data} = action.payload;

    if (data.next) {
      return questionsRequestAC.pagedFeed.Actions.pagedFeed({
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedFeed.Actions.pagedFeed({
        limit: data.limit,
      });
    }
  }),
);

const getPagedQuestionsMeEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_PAGED_QUESTIONS_ME,
  ),
  map((action: ReturnType<typeof fromActions.Actions.getPagedQuestionsMe>) => {
    const {data} = action.payload;

    if (data.next) {
      return questionsRequestAC.pagedMy.Actions.pagedMy({
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedMy.Actions.pagedMy({
        limit: data.limit,
      });
    }
  }),
);

const getPagedQuestionsUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_PAGED_QUESTIONS_USER,
  ),
  map((action: ReturnType<typeof fromActions.Actions.getPagedQuestionsUser>) => {
    const {data} = action.payload;

    if (data.next) {
      return questionsRequestAC.pagedOfUser.Actions.pagedOfUser({
        id: data.id,
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedOfUser.Actions.pagedOfUser({
        id: data.id,
        limit: data.limit,
      });
    }
  }),
);

export const questionsEpics = [
  setQuestionsDataEpic,
  setQuestionsDataFromPagedQuestionsEpic,
  createQuestionEpic,
  getPagedQuestionsFeedEpic,
  getPagedQuestionsMeEpic,
  getPagedQuestionsUserEpic,
  setPagedQuestionsIdsFromFeedEpic,
  setPagedQuestionsIdsFromMeEpic,
  setPagedQuestionsIdsFromUserEpic,
];