import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { user } from '../templates/user.template';
import { execute } from 'apollo-link';
import link from '../middlewares/link.middleware';
import { createSelector, OutputSelector } from 'reselect';
import { RootState } from '../../redux/store';
import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';

export interface ContactInput {
  emails: string[];
  phones: string[];
}

interface IContactsService {
  sendContactsToServer(input: ContactInput[]): Observable<any>;
  getUsersFromContacts: OutputSelector<RootState, UserModel[],
    (res1: UserModel[], res2: string[] | null) => UserModel[]>;
  getProfilesFromContacts: OutputSelector<RootState, ProfileModel[],
    (res1: UserModel[], res2: ProfileModel[]) => ProfileModel[]>;
}

class ContactsService implements IContactsService {

  sendContactsToServer(input: ContactInput[]) {
    const operation = {
      query: gql`
        mutation importContacts($input: [ContactInput]) {
          importContacts(input: $input) ${user}
        }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  getUsersFromContacts = createSelector(
    [
      (state: RootState) => state.users.entities,
      (state: RootState) => state.contacts.contactsUsersIds,
    ],
    (users, contactsUsersIds) => {
      if (contactsUsersIds) {
        return users.filter(userItem => {
          return !!contactsUsersIds.find((contactsUsersId) => contactsUsersId === userItem._id);
        });
      } else {
        return [];
      }
    },
  );

  getProfilesFromContacts = createSelector(
    [
      this.getUsersFromContacts,
      (state: RootState) => state.profiles.entities,
    ],
    (users, profiles) => {
      if (users.length !== 0) {
        return profiles.filter(profile => {
          return !!users.find((userItem) => userItem.profileId === profile._id);
        });
      } else {
        return [];
      }
    },
  );
}

export default new ContactsService();
