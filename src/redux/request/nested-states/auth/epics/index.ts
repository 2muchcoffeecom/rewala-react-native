import { loginEpic } from '../nested-states/login/epics';

export const authEpic = [
  loginEpic,
];