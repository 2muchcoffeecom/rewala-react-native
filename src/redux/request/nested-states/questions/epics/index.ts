import { createQuestionRequestEpic } from '../nested-states/createQuestion/epics';
import { pagedFeedRequestEpic } from '../nested-states/pagedFeed/epics';
import { pagedMyRequestEpic } from '../nested-states/pagedMy/epics';
import { pagedOfUserRequestEpic } from '../nested-states/pagedOfUser/epics';

export const questionsEpic = [
  createQuestionRequestEpic,
  pagedFeedRequestEpic,
  pagedMyRequestEpic,
  pagedOfUserRequestEpic,
];