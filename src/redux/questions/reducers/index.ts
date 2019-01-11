import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, QuestionsState } from '../states';
import { QuestionModel } from '../../../shared/models/question.model';

export function reducer(state = initialState, action: fromActions.Actions): QuestionsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_QUESTIONS_DATA: {
      const questionsFromAction = action.payload.data.map<QuestionModel>((question) => new QuestionModel(question));

      const entities = unionBy(state.entities, questionsFromAction, '_id');
      const newEntities = entities.map<QuestionModel>((entity) => {
        const newQuestion = questionsFromAction
          .find(questionFromAction => questionFromAction._id === entity._id);

        return newQuestion ? Object.assign({}, entity, newQuestion) : entity;
      });

      return {
        ...state,
        entities: newEntities,
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_FEED_AFTER_FIRST_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromFeedIds: [...pagedQuestionsIds],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_FEED_AFTER_NEXT_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromFeedIds: [...state.pagedQuestionsFromFeedIds, ...pagedQuestionsIds],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_ME_AFTER_FIRST_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromMeIds: [...pagedQuestionsIds],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_ME_AFTER_NEXT_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromMeIds: [...state.pagedQuestionsFromMeIds, ...pagedQuestionsIds],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_USER_AFTER_FIRST_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromUserIds: [...pagedQuestionsIds],
      };
    }

    case fromActions.ActionTypes.SET_PAGED_QUESTIONS_IDS_FROM_USER_AFTER_NEXT_PAGE: {
      const pagedQuestionsIds = action.payload.data.results.map<string>((question) => question._id);

      return {
        ...state,
        pagedQuestionsFromUserIds: [...state.pagedQuestionsFromUserIds, ...pagedQuestionsIds],
      };
    }

    default:
      return state;
  }
}