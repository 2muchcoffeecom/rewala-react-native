import { friendCreateFollowRequestEpic } from '../nested-states/create/epics';
import { friendUpdateFollowRequestEpic } from '../nested-states/update/epics';
import { friendGetMyFollowRequestEpic } from '../nested-states/getMyFriends/epics';

export const friendsEpic = [
  friendCreateFollowRequestEpic,
  friendUpdateFollowRequestEpic,
  friendGetMyFollowRequestEpic,
];