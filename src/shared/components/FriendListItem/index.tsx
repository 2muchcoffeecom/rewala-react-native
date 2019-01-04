import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View } from 'react-native';
import ButtonFollowRequest from '../ButtonFollowRequest';
import UserListItemInfo from '../UserListItemInfo';

import { RootState } from '../../../redux/store';
import { FollowRequest } from '../../models/followRequest.model';

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
  friendFollowRequest: FollowRequest | undefined;
  authorizedUserId: string;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  friendFollowRequest: selectorsService.getFriendFollowRequestByUserId(state, props),
  authorizedUserId: state.auth.authorizedUserId,
});

type Props = OwnProps & StateProps;

class FriendListItem extends React.PureComponent<Props> {
  render() {

    const {
      avatarThumbPath, fullName, userId, friendFollowRequest, withFriendProfile, authorizedUserId,
    } = this.props;

    return (
      <View style={style.friendListItem}>
        <UserListItemInfo
          userId={userId}
          fullName={fullName}
          avatarThumbPath={avatarThumbPath}
          withFriendProfile={withFriendProfile}
          authorizedUserId={withFriendProfile ? authorizedUserId : undefined}
          friendFollowRequest={withFriendProfile ? friendFollowRequest : undefined}
        />
        <View>
          <ButtonFollowRequest
            friendFollowRequest={friendFollowRequest}
            userId={userId}
          />
        </View>
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(FriendListItem);
