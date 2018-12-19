import { createSelector, OutputParametricSelector, OutputSelector } from 'reselect';
import { RootState } from '../../redux/store';
import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';
import { NavigationInjectedProps } from 'react-navigation';
import { FriendNavigationProps, OwnProps as FriendListItemOwnProp } from '../components/FriendListItem';
import { FollowRequest, FollowRequestStatus } from '../models/followRequest.model';

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
    (res1: FollowRequest[], res2: string) => FollowRequest | undefined>;
  getFriendFollowRequestById: OutputParametricSelector<RootState,
    NavigationInjectedProps<FriendNavigationProps>,
    FollowRequest | undefined,
    (res1: FollowRequest[], res2: string, res3: string) => FollowRequest | undefined>;
  getMyFriendsProfiles: OutputSelector<RootState, ProfileModel[],
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
      (
        state: RootState,
        props: FriendListItemOwnProp,
      ) => props.userId,
    ],
    (followRequests, userId) => followRequests.find(
      followRequest => followRequest.toUserId === userId || followRequest.fromUserId === userId,
    ),
  );

  getFriendFollowRequestById = createSelector(
    [
      (state: RootState) => state.friends.entities,
      (state: RootState) => state.auth.authorizedUserId,
      (
        state: RootState,
        props: NavigationInjectedProps<FriendNavigationProps>,
      ) => props.navigation.getParam('friendFollowRequestId', ''),
    ],
    (followRequests, authorizedUserId, followRequestId) => {
      const currentFollowRequest = followRequests.find(
        followRequest => followRequest._id === followRequestId,
      );
      const newFollowRequest = followRequests
        .filter(followRequest => followRequest._id !== followRequestId)
        .find((followRequest) => {
          let toUserId;
          if (currentFollowRequest) {
            toUserId = currentFollowRequest.toUserId === authorizedUserId ?
              currentFollowRequest.fromUserId :
              currentFollowRequest.toUserId;
          }

          return followRequest.fromUserId === authorizedUserId &&
            followRequest.toUserId === toUserId &&
            followRequest.status !== FollowRequestStatus.DECLINED;
        });

      return currentFollowRequest && currentFollowRequest.status !== FollowRequestStatus.DECLINED ?
        currentFollowRequest : newFollowRequest;
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
      this.getMyFriendsProfiles,
      (
        state: RootState,
        props: NavigationInjectedProps<FriendNavigationProps>,
      ) => props.navigation.getParam('userId', ''),
    ],
    (profiles, userId) => profiles.find(profile => profile.userId === userId),
  );
}

export default new SelectorsService();
