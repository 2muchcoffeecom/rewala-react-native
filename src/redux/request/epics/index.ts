import { authEpic } from '../nested-states/auth/epics';

export const requestEpics = [
  ...authEpic,
];