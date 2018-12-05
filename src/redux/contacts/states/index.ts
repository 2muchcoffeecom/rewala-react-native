export interface ContactsState {
  contactsUsersIds: string[] | null;
}

export const initialState: ContactsState = {
  contactsUsersIds: null,
};