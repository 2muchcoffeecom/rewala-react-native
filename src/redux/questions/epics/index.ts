import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { ignoreElements, map, tap } from 'rxjs/operators';
import * as fromActions from '../AC';
import { questionsRequestAC } from '../../request/AC';
import navService from '../../../shared/services/nav.service';

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

    return fromActions.Actions.setQuestionsData(questions);
  }),
);

const setPagedQuestionsIdsFromFeedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedFeed.Actions.pagedFeedNextSuccess>>(
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_NEXT_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    if (action.type === questionsRequestAC.pagedFeed.ActionTypes.PAGED_FEED_REQUEST_FIRST_SUCCESS) {
      return fromActions.Actions.setPagedQuestionsIdsFromFeedAfterFirstPage(pagedQuestionsData);
    } else {
      return fromActions.Actions.setPagedQuestionsIdsFromFeedAfterNextPage(pagedQuestionsData);
    }
  }),
);

const setPagedQuestionsIdsFromMeEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedMe.Actions.pagedMeFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedMe.Actions.pagedMeNextSuccess>>(
    questionsRequestAC.pagedMe.ActionTypes.PAGED_ME_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedMe.ActionTypes.PAGED_ME_REQUEST_NEXT_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    if (action.type === questionsRequestAC.pagedMe.ActionTypes.PAGED_ME_REQUEST_FIRST_SUCCESS) {
      return fromActions.Actions.setPagedQuestionsIdsFromMeAfterFirstPage(pagedQuestionsData);
    } else {
      return fromActions.Actions.setPagedQuestionsIdsFromMeAfterNextPage(pagedQuestionsData);
    }
  }),
);

const setPagedQuestionsIdsFromUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserFirstSuccess> |
    ReturnType<typeof questionsRequestAC.pagedOfUser.Actions.pagedOfUserNextSuccess>>(
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_FIRST_SUCCESS,
    questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_NEXT_SUCCESS,
  ),
  map((action) => {
    const pagedQuestionsData = action.payload.data;

    if (action.type === questionsRequestAC.pagedOfUser.ActionTypes.PAGED_OF_USER_REQUEST_FIRST_SUCCESS) {
      return fromActions.Actions.setPagedQuestionsIdsFromUserAfterFirstPage(pagedQuestionsData);
    } else {
      return fromActions.Actions.setPagedQuestionsIdsFromUserAfterNextPage(pagedQuestionsData);
    }
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

const redirectToHomeScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof questionsRequestAC.createQuestion.Actions.createQuestionSuccess>>(
    questionsRequestAC.createQuestion.ActionTypes.CREATE_QUESTION_SUCCESS,
  ),
  tap(() => navService.navigate('HomeScreen')),
  ignoreElements(),
);

const getPagedQuestionsFeedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_PAGED_QUESTIONS_FEED,
  ),
  map((action: ReturnType<typeof fromActions.Actions.getPagedQuestionsFeed>) => {
    const {data} = action.payload;

    if (data.next) {
      return questionsRequestAC.pagedFeed.Actions.pagedFeedNext({
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedFeed.Actions.pagedFeedFirst({
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
      return questionsRequestAC.pagedMe.Actions.pagedMeNext({
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedMe.Actions.pagedMeFirst({
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
      return questionsRequestAC.pagedOfUser.Actions.pagedOfUserNext({
        id: data.id,
        limit: data.limit,
        next: data.next,
      });
    } else {
      return questionsRequestAC.pagedOfUser.Actions.pagedOfUserFirst({
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
  redirectToHomeScreenEpic,
];