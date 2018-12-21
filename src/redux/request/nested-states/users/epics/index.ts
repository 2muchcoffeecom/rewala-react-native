import { GetMeRequestEpic } from '../nested-states/getMe/epics';
import { updateMeRequestEpic } from '../nested-states/updateMe/epics';
import { newSearchRequestEpic, newSearchPageRequestEpic } from '../nested-states/search/epics';
import { getUserFriendsRequestEpic } from '../nested-states/userFriends/epics';

export const usersEpic = [
  GetMeRequestEpic,
  updateMeRequestEpic,
  newSearchRequestEpic,
  newSearchPageRequestEpic,
  getUserFriendsRequestEpic,
];