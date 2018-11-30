import { contactsSendRequestEpic } from '../nested-states/sendContacts/epics';

export const contactsEpic = [
  contactsSendRequestEpic,
];