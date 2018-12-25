import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { Image, Text, View, TouchableOpacity } from 'react-native';
import ButtonFollowRequest from '../ButtonFollowRequest';

import { RootState } from '../../../redux/store';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { FollowRequest } from '../../models/followRequest.model';

import navService from '../../services/nav.service';
import selectorsService from '../../services/selectors.service';

export interface FriendNavigationProps {
  userId: string;
  friendFollowRequestId: string;
}

export interface OwnProps {
  userId: string;
  fullName: string;
  avatarThumbPath?: string;
  withFriendProfile?: boolean;
}

interface StateProps {
  friend: FollowRequest | undefined;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  friend: selectorsService.getFriendFollowRequestByUserId(state, props),
});

type Props = OwnProps & StateProps;

class FriendListItem extends React.PureComponent<Props> {
  render() {

    const {
      avatarThumbPath, fullName, userId, friend, withFriendProfile,
    } = this.props;

    const onPressFriend = () => {
      const params: FriendNavigationProps = {
        userId: this.props.userId,
        friendFollowRequestId: this.props.friend ? this.props.friend._id : '',
      };
      navService.push('ProfileFriendScreen', params);
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
                  source={avatarThumbPath ?
                    {uri: `${apiEndpoint}/${avatarThumbPath}`} :
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
                  source={avatarThumbPath ?
                    {uri: `${apiEndpoint}/${avatarThumbPath}`} :
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
        <View>
          <ButtonFollowRequest
            friendFollowRequest={friend}
            userId={userId}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(FriendListItem);
