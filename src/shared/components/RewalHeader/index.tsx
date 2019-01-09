import React from 'react';
import style from './style';
import { blackColor, QuestionOptionsColor } from '../../../app.style';
import { apiEndpoint } from '../../constants/apiEndpoint';

import { Image, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from '../../../shared/components/Icon';

import { FriendNavigationProps } from '../FriendListItem';
import { FollowRequest } from '../../models/followRequest.model';

import navService from '../../services/nav.service';

interface OwnProps {
  fullName: string;
  hoursLeft: string;
  ownerId: string;
  authorizedUserId: string;
  avatarThumbPath?: string;
  friendFollowRequest?: FollowRequest;
}

type Props = OwnProps;

const RewalHeader: React.FunctionComponent<Props> = (props) => {
  const {
    avatarThumbPath, fullName, hoursLeft, ownerId, authorizedUserId, friendFollowRequest,
  } = props;

  const avatarUri = `${apiEndpoint}${avatarThumbPath}`;

  const onPressUser = () => {
    const params: FriendNavigationProps = {
      userId: ownerId,
      friendFollowRequestId: friendFollowRequest ? friendFollowRequest._id : '',
    };

    ownerId === authorizedUserId ?
      navService.push('ProfileScreen', params) :
      navService.push('ProfileFriendScreen', params);
  };

  return (
    <View style={style.root}>
      <View style={style.userInfo}>
        <TouchableOpacity
          onPress={onPressUser}
        >
          <Image
            source={
              avatarThumbPath ?
                {uri: avatarUri} :
                require('../../../../assets/avatar-placeholder.png')
            }
            style={style.avatar}
          />
        </TouchableOpacity>
        <View style={style.textWraper}>
          <TouchableOpacity
            onPress={onPressUser}
          >
            <Text style={style.fullNameText}>
              {fullName}
            </Text>
          </TouchableOpacity>
          <View style={style.hoursTextWpaper}>
            <Icon
              name='time'
              size={11}
              color={QuestionOptionsColor.Option4}
              style={style.iconTime}
            />
            <Text style={style.hoursText}>
              {`${hoursLeft} hours left`}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={style.popupButton}
      >
        <Icon
          name='more'
          size={17}
          color={blackColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(RewalHeader);
