import { GetMeRequestEpic } from '../nested-states/getMe/epics';
import { updateMeRequestEpic } from '../nested-states/updateMe/epics';
import { newSearchRequestEpic, newSearchPageRequestEpic } from '../nested-states/search/epics';

export const usersEpic = [
  GetMeRequestEpic,
  updateMeRequestEpic,
  newSearchRequestEpic,
  newSearchPageRequestEpic,
];