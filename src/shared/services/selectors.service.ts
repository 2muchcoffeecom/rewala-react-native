import { createSelector, OutputSelector } from 'reselect';
import { RootState } from '../../redux/store';
import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';

interface ISelectorsService {
  getUsersFromContacts: OutputSelector<RootState, UserModel[],
    (res1: UserModel[], res2: string[] | null) => UserModel[]>;
  getProfilesFromContacts: OutputSelector<RootState, ProfileModel[],
    (res1: UserModel[], res2: ProfileModel[]) => ProfileModel[]>;
  getAuthorizedUserProfile: OutputSelector<RootState, ProfileModel | undefined,
    (res1: string | null, res2: ProfileModel[]) => ProfileModel | undefined>;
  getMyFriendsProfiles: OutputSelector<RootState, ProfileModel[],
    (res1: string[], res2: ProfileModel[]) => ProfileModel[]>;
}

class SelectorsService implements ISelectorsService {

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

  getAuthorizedUserProfile = createSelector(
    [
      (state: RootState) => state.auth.authorizedUserId,
      (state: RootState) => state.profiles.entities,
    ],
    (userId, profiles) => {
      return profiles.find(profile => profile.userId === userId);
    },
  );

  getMyFriendsProfiles = createSelector(
    [
      (state: RootState) => state.friends.myFriendsIds,
      (state: RootState) => state.profiles.entities,
    ],
    (userIds, profiles) => {
      if (userIds.length !== 0) {
        return profiles.filter(profile => {
          return !!userIds.find((userId) => userId === profile.userId);
        });
      } else {
        return [];
      }
    },
  );
}

export default new SelectorsService();
