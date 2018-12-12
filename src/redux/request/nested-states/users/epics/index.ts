import { GetMeRequestEpic } from '../nested-states/getMe/epics';
import { updateMeRequestEpic } from '../nested-states/updateMe/epics';

export const usersEpic = [
  GetMeRequestEpic,
  updateMeRequestEpic,
];