import { GetMeRequestEpic } from '../nested-states/getMe/epics';
import { updateMeRequestEpic } from '../nested-states/updateMe/epics';
import { searchRequestEpic } from '../nested-states/search/epics';

export const usersEpic = [
  GetMeRequestEpic,
  updateMeRequestEpic,
  searchRequestEpic,
];