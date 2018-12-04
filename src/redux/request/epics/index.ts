import { authEpic } from '../nested-states/auth/epics';
import { contactsEpic } from '../nested-states/contacts/epics';
import { friendsEpic } from '../nested-states/friends/epics';

export const requestEpics = [
  ...authEpic,
  ...contactsEpic,
  ...friendsEpic,
];