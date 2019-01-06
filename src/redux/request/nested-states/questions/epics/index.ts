import { createQuestionRequestEpic } from '../nested-states/createQuestion/epics';

export const questionsEpic = [
  createQuestionRequestEpic,
];