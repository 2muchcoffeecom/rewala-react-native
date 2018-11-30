import { authEpic } from '../nested-states/auth/epics';
import { contactsEpic } from '../nested-states/contacts/epics';

export const requestEpics = [
  ...authEpic,
  ...contactsEpic,
];