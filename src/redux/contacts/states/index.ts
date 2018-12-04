export interface ContactsState {
  contactsUsersId: string[] | null;
}

export const initialState: ContactsState = {
  contactsUsersId: null,
};