import React from 'react';
import style from './style';
import { apiEndpoint } from '../../constants/apiEndpoint';

import { Image, Text, View, TouchableOpacity } from 'react-native';

import { FollowRequest } from '../../models/followRequest.model';
import { FriendNavigationProps } from '../FriendListItem';

import navService from '../../services/nav.service';

export interface OwnProps {
  userId: string;
  fullName: string;
  avatarThumbPath?: string;
  withFriendProfile?: boolean;
  friendFollowRequest?: FollowRequest;
  authorizedUserId?: string;
}

type Props = OwnProps;

const UserListItemInfo: React.FunctionComponent<Props> = (props) => {

  const {
    avatarThumbPath, fullName, userId, friendFollowRequest, withFriendProfile, authorizedUserId,
  } = props;

  const onPressUser = () => {
    const params: FriendNavigationProps = {
      userId: props.userId,
      friendFollowRequestId: friendFollowRequest ? friendFollowRequest._id : '',
    };

    userId === authorizedUserId ?
      navService.push('ProfileScreen', params) :
      navService.push('ProfileOfUserScreen', params);
  };

  const getUserInfoBody = (): JSX.Element => (
    <React.Fragment>
      <Image
        source={avatarThumbPath ?
          {uri: `${apiEndpoint}/${avatarThumbPath}`} :
          require('../../../../assets/avatar-placeholder.png')}
        style={style.friendAvatar}
      />
      <Text style={style.friendName}>{fullName}</Text>
    </React.Fragment>
  );

  if (withFriendProfile) {
    return (
      <TouchableOpacity
        onPress={onPressUser}
        style={style.friendInfoWraper}
      >
        {getUserInfoBody()}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={style.friendInfoWraper}>
        {getUserInfoBody()}
      </View>
    );
  }
};

export default React.memo(UserListItemInfo);
