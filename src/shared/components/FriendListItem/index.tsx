import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { Image, Text, View, TouchableOpacity } from 'react-native';
import ButtonFollowRequest from '../ButtonFollowRequest';

import { RootState } from '../../../redux/store';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { FollowRequest, FollowRequestStatus } from '../../models/followRequest.model';

import navService from '../../services/nav.service';
import selectorsService from '../../services/selectors.service';

export interface FriendNavigationProps {
  userId: string;
  friendFollowRequestId: string;
}

export interface OwnProps {
  userId: string;
  fullName: string;
  avatarPath?: string;
  withFriendProfile?: boolean;
}

interface StateProps {
  friend: FollowRequest | undefined;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  friend: selectorsService.getFriendFollowRequestByUserId(state, props),
});

type Props = OwnProps & StateProps;

const FriendListItem: React.FunctionComponent<Props> = (props) => {
  const {
    avatarPath, fullName, userId, friend, withFriendProfile,
  } = props;

  const isFriendAccepted = !!(friend && friend.status === FollowRequestStatus.ACCEPTED);
  const isFriendDeclined = !!(friend && friend.status === FollowRequestStatus.DECLINED);
  const isFriendPendingForUser = !!(friend && friend.status === FollowRequestStatus.PENDING);

  const onPressFriend = () => {
    const params: FriendNavigationProps = {
      userId: props.userId,
      friendFollowRequestId: props.friend ? props.friend._id : '',
    };
    navService.navigate('ProfileFriendScreen', params);
  };

  return (
    <View style={style.friendListItem}>
      {
        withFriendProfile ?
          (
            <TouchableOpacity
              onPress={onPressFriend}
              style={style.friendInfoWraper}
            >
              <Image
                source={avatarPath ?
                  {uri: `${apiEndpoint}/${avatarPath}`} :
                  require('../../../../assets/avatar-placeholder.png')}
                style={style.friendAvatar}
              />
              <Text
                style={style.friendName}
              >
                {fullName}
              </Text>
            </TouchableOpacity>
          ) :
          (
            <View style={style.friendInfoWraper}>
              <Image
                source={avatarPath ?
                  {uri: `${apiEndpoint}/${avatarPath}`} :
                  require('../../../../assets/avatar-placeholder.png')}
                style={style.friendAvatar}
              />
              <Text
                style={style.friendName}
              >
                {fullName}
              </Text>
            </View>
          )
      }
      <View style={style.friendButtonWraper}>
        <ButtonFollowRequest
          isFriendFollowRequestDeclined={isFriendDeclined}
          isFriendFollowRequestAccepted={isFriendAccepted}
          isFriendFollowRequestPendingForUser={isFriendPendingForUser}
          friendFollowRequest={friend}
          userId={userId}
        />
      </View>
    </View>
  );
};

export default connect<StateProps>(mapStateToProps)(FriendListItem);
