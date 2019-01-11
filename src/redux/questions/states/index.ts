import { QuestionModel } from '../../../shared/models/question.model';

export interface QuestionsState {
  pagedQuestionsFromFeedIds: string[];
  pagedQuestionsFromMeIds: string[];
  pagedQuestionsFromUserIds: string[];
  entities: QuestionModel[];
}

export const initialState: QuestionsState = {
  entities: [],
  pagedQuestionsFromFeedIds: [],
  pagedQuestionsFromMeIds: [],
  pagedQuestionsFromUserIds: [],
};