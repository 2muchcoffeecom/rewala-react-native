import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { Image, Text, View } from 'react-native';
import RegularButton from '../RegularButton';

import { RootState } from '../../../redux/store';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { UpdateFollowRequestInput } from '../../services/friend.service';
import { FollowRequest, FollowRequestStatus } from '../../models/followRequest.model';

import { Actions as friendsActions } from '../../../redux/friends/AC';

export interface OwnProps {
  userId: string;
  fullName: string;
  avatarPath?: string;
}

interface StateProps {
  friends: FollowRequest[];
}

interface DispatchProps {
  addFriend(data: string): void;
  deleteFriend(data: UpdateFollowRequestInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  friends: state.friends.entities,
});

const mapDispatchToProps = (dispatch: Dispatch<friendsActions>): DispatchProps => (
  {
    addFriend: (data) => {
      dispatch(friendsActions.addFriend(data));
    },
    deleteFriend: (data) => {
      dispatch(friendsActions.deleteFriend(data));
    },
  }
);

type Props = OwnProps & StateProps & DispatchProps;

const FriendListItem: React.FunctionComponent<Props> = (props) => {
  const {
    avatarPath, fullName, addFriend, userId, deleteFriend, friends,
  } = props;

  const onPressAddFriend = () => {
    addFriend(userId);
  };

  const friend = friends.find((friendItem) => friendItem.toUserId === userId);
  const isFriendAdded = !!(friend && friend.status !== FollowRequestStatus.DECLINED);

  const onPressDeleteFriend = () => {
    const input: UpdateFollowRequestInput = {
      status: FollowRequestStatus.DECLINED,
      _id: friend ? friend._id : '',
    };

    deleteFriend(input);
  };

  return (
    <View style={style.friendListItem}>
      <View style={style.friendInfoWraper}>
        <Image
          source={avatarPath ?
            {uri: `${apiEndpoint}/graphql/${avatarPath}`} :
            require('../../../../assets/avatar-placeholder.png')}
          style={style.friendAvatar}
        />
        <Text
          style={style.friendName}
        >
          {fullName}
        </Text>
      </View>
      <View style={style.friendButtonWraper}>
        <RegularButton
          isInverted={isFriendAdded}
          title={isFriendAdded ? 'DELETE FRIEND' : 'ADD FRIEND'}
          fontSize={9}
          onPress={isFriendAdded ? onPressDeleteFriend : onPressAddFriend}
        />
      </View>
    </View>
  );
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FriendListItem);
