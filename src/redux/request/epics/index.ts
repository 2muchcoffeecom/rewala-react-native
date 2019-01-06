import { authEpic } from '../nested-states/auth/epics';
import { contactsEpic } from '../nested-states/contacts/epics';
import { friendsEpic } from '../nested-states/friends/epics';
import { usersEpic } from '../nested-states/users/epics';
import { questionsEpic } from '../nested-states/questions/epics';

export const requestEpics = [
  ...authEpic,
  ...contactsEpic,
  ...friendsEpic,
  ...usersEpic,
  ...questionsEpic,
];