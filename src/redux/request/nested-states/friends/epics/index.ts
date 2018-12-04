import { friendCreateFollowRequestEpic } from '../nested-states/create/epics';
import { friendUpdateFollowRequestEpic } from '../nested-states/update/epics';

export const friendsEpic = [
  friendCreateFollowRequestEpic,
  friendUpdateFollowRequestEpic,
];