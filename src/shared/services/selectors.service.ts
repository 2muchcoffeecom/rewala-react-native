import { createSelector, OutputParametricSelector, OutputSelector } from 'reselect';
import { RootState } from '../../redux/store';
import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';
import { NavigationInjectedProps } from 'react-navigation';
import { FriendNavigationProps, OwnProps as FriendListItemOwnProp } from '../components/FriendListItem';
import { FollowRequest } from '../models/followRequest.model';

interface ISelectorsService {
  getUsersFromContacts: OutputSelector<RootState, UserModel[],
    (res1: UserModel[], res2: string[] | null) => UserModel[]>;
  getProfilesFromContacts: OutputSelector<RootState, ProfileModel[],
    (res1: UserModel[], res2: ProfileModel[]) => ProfileModel[]>;
  getAuthorizedUserProfile: OutputSelector<RootState, ProfileModel | undefined,
    (res1: string | null, res2: ProfileModel[]) => ProfileModel | undefined>;
  getAuthorizedUser: OutputSelector<RootState, UserModel | undefined,
    (res1: string | null, res2: UserModel[]) => UserModel | undefined>;
  getFollowRequestsWithMe: OutputSelector<RootState, FollowRequest[],
    (res1: string, res2: FollowRequest[]) => FollowRequest[]>;
  getFriendFollowRequestByUserId: OutputParametricSelector<RootState,
    FriendListItemOwnProp,
    FollowRequest | undefined,
    (res1: FollowRequest[], res2: string, res3: string) => FollowRequest | undefined>;
  getFriendFollowRequestByUserIdFromNavProps: OutputParametricSelector<RootState,
    NavigationInjectedProps<FriendNavigationProps>,
    FollowRequest | undefined,
    (res1: FollowRequest[], res2: string, res3: string) => FollowRequest | undefined>;
  getMyFriendsProfiles: OutputSelector<RootState, ProfileModel[],
    (res1: string[], res2: ProfileModel[]) => ProfileModel[]>;
  getUserFriendsProfiles: OutputSelector<RootState, ProfileModel[],
    (res1: string[], res2: ProfileModel[]) => ProfileModel[]>;
  getPagedUsersProfiles: OutputSelector<RootState, ProfileModel[],
    (res1: string[], res2: ProfileModel[]) => ProfileModel[]>;
  getFriendProfileByUserId: OutputParametricSelector<RootState,
    NavigationInjectedProps<FriendNavigationProps>,
    ProfileModel | undefined,
    (res1: ProfileModel[], res2: string) => ProfileModel | undefined>;
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

  getAuthorizedUser = createSelector(
    [
      (state: RootState) => state.auth.authorizedUserId,
      (state: RootState) => state.users.entities,
    ],
    (userId, users) => {
      return users.find(user => user._id === userId);
    },
  );

  getFollowRequestsWithMe = createSelector(
    [
      (state: RootState) => state.auth.authorizedUserId,
      (state: RootState) => state.friends.entities,
    ],
    (userId, followRequests) => {
      return followRequests.filter(followRequest => {
        return followRequest.toUserId === userId || followRequest.fromUserId === userId;
      });
    },
  );

  getFriendFollowRequestByUserId = createSelector(
    [
      (state: RootState) => state.friends.entities,
      (state: RootState) => state.auth.authorizedUserId,
      (
        state: RootState,
        props: FriendListItemOwnProp,
      ) => props.userId,
    ],
    (followRequests, authorizedUserId, userId) => {
      return followRequests.find(followRequest => {
          return (followRequest.toUserId === userId && followRequest.fromUserId === authorizedUserId) ||
            (followRequest.fromUserId === userId && followRequest.toUserId === authorizedUserId);
        },
      );
    },
  );

  getFriendFollowRequestByUserIdFromNavProps = createSelector(
    [
      (state: RootState) => state.friends.entities,
      (state: RootState) => state.auth.authorizedUserId,
      (
        state: RootState,
        props: NavigationInjectedProps<FriendNavigationProps>,
      ) => props.navigation.getParam('userId', ''),
    ],
    (followRequests, authorizedUserId, userId) => {
      return followRequests.find(followRequest => {
          return (followRequest.toUserId === userId && followRequest.fromUserId === authorizedUserId) ||
            (followRequest.fromUserId === userId && followRequest.toUserId === authorizedUserId);
        },
      );
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

  getUserFriendsProfiles = createSelector(
    [
      (state: RootState) => state.users.userFriendsIds,
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

  getPagedUsersProfiles = createSelector(
    [
      (state: RootState) => state.users.pagedUsersIds,
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

  getFriendProfileByUserId = createSelector(
    [
      (state: RootState) => state.profiles.entities,
      (
        state: RootState,
        props: NavigationInjectedProps<FriendNavigationProps>,
      ) => props.navigation.getParam('userId', ''),
    ],
    (profiles, userId) => profiles.find(profile => profile.userId === userId),
  );
}

export default new SelectorsService();
