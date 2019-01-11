import { createQuestionRequestEpic } from '../nested-states/createQuestion/epics';
import { pagedFeedFirstRequestEpic, pagedFeedNextRequestEpic } from '../nested-states/pagedFeed/epics';
import { pagedMeFirstRequestEpic, pagedMeNextRequestEpic } from '../nested-states/pagedMe/epics';
import { pagedOfUserFirstRequestEpic, pagedOfUserNextRequestEpic } from '../nested-states/pagedOfUser/epics';

export const questionsEpic = [
  createQuestionRequestEpic,
  pagedFeedFirstRequestEpic,
  pagedFeedNextRequestEpic,
  pagedMeFirstRequestEpic,
  pagedMeNextRequestEpic,
  pagedOfUserFirstRequestEpic,
  pagedOfUserNextRequestEpic,
];