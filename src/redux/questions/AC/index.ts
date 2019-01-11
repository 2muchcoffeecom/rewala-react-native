import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { QuestionResponse } from '../../../shared/models/question.model';
import {
  CreateQuestionInput, PagedQuestionInput, PagedQuestionOfUserInput,
} from '../../../shared/services/question.service';
import { Reject, Resolve } from '../../request/states';
import { PagedResponseOf } from '../../../shared/models/pagedUser.model';

export enum ActionTypes {
  SET_QUESTIONS_DATA = 'SET_QUESTIONS_DATA',
  SUBMIT_CREATE_QUESTION = 'SUBMIT_CREATE_QUESTION',
  SET_PAGED_QUESTIONS_IDS_FROM_FEED = 'SET_PAGED_QUESTIONS_IDS_FROM_FEED',
  SET_PAGED_QUESTIONS_IDS_FROM_ME = 'SET_PAGED_QUESTIONS_IDS_FROM_ME',
  SET_PAGED_QUESTIONS_IDS_FROM_USER = 'SET_PAGED_QUESTIONS_IDS_FROM_USER',
  GET_PAGED_QUESTIONS_FEED = 'GET_PAGED_QUESTIONS_FEED',
  GET_PAGED_QUESTIONS_ME = 'GET_PAGED_QUESTIONS_ME',
  GET_PAGED_QUESTIONS_USER = 'GET_PAGED_QUESTIONS_USER',
}

export const Actions = {
  setQuestionsData: (data: QuestionResponse[]) => {
    return createAction(ActionTypes.SET_QUESTIONS_DATA, {data});
  },
  submitCreateQuestion: (data: CreateQuestionInput, resolve?: Resolve<QuestionResponse>, reject?: Reject) => {
    return createAction(ActionTypes.SUBMIT_CREATE_QUESTION, {data, resolve, reject});
  },
  setPagedQuestionsIdsFromFeed: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_FEED, {data});
  },
  setPagedQuestionsIdsFromMe: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_ME, {data});
  },
  setPagedQuestionsIdsFromUser: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_USER, {data});
  },
  getPagedQuestionsFeed: (data: PagedQuestionInput) => {
    return createAction(ActionTypes.GET_PAGED_QUESTIONS_FEED, {data});
  },
  getPagedQuestionsMe: (data: PagedQuestionInput) => {
    return createAction(ActionTypes.GET_PAGED_QUESTIONS_ME, {data});
  },
  getPagedQuestionsUser: (data: PagedQuestionOfUserInput) => {
    return createAction(ActionTypes.GET_PAGED_QUESTIONS_USER, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
