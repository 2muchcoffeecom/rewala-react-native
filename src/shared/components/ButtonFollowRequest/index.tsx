import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View } from 'react-native';
import RegularButton from '../RegularButton';

import { UpdateFollowRequestInput } from '../../services/friend.service';
import { Dispatch } from 'redux';
import { FollowRequest, FollowRequestStatus } from '../../models/followRequest.model';
import { RootState } from '../../../redux/store';

import { Actions as friendsActions } from '../../../redux/friends/AC';

interface OwnProps {
  userId: string;
  friendFollowRequest?: FollowRequest;
}

interface StateProps {
  authorizedUserId: string;
}

interface DispatchProps {
  addFriend(data: string): void;
  updateFriend(data: UpdateFollowRequestInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  authorizedUserId: state.auth.authorizedUserId,
});

const mapDispatchToProps = (dispatch: Dispatch<friendsActions>): DispatchProps => (
  {
    addFriend: (data) => {
      dispatch(friendsActions.addFriend(data));
    },
    updateFriend: (data) => {
      dispatch(friendsActions.updateFriend(data));
    },
  }
);

type Props = OwnProps & StateProps & DispatchProps;

const FriendsRewals: React.FunctionComponent<Props> = (props) => {
  const {
    friendFollowRequest, authorizedUserId,
  } = props;

  const isFriendFollowRequestAccepted = !!friendFollowRequest &&
    friendFollowRequest.status === FollowRequestStatus.ACCEPTED;
  const isFriendFollowRequestDeclined = !friendFollowRequest ||
    (!!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.DECLINED);
  const isFriendFollowRequestPendingForUser = !!friendFollowRequest &&
    friendFollowRequest.status === FollowRequestStatus.PENDING &&
    friendFollowRequest.fromUserId === authorizedUserId;

  const isFriendFollowRequestPendingForMe = !!friendFollowRequest &&
    friendFollowRequest.status === FollowRequestStatus.PENDING &&
    friendFollowRequest.toUserId === authorizedUserId;

  const onPressAddFriend = () => {
    props.addFriend(props.userId);
  };

  const onPressDeleteFriend = () => {
    const input: UpdateFollowRequestInput = {
      status: FollowRequestStatus.DECLINED,
      _id: props.friendFollowRequest ? props.friendFollowRequest._id : '',
    };

    props.updateFriend(input);
  };

  const onPressAcceptFriend = () => {
    const input: UpdateFollowRequestInput = {
      status: FollowRequestStatus.ACCEPTED,
      _id: props.friendFollowRequest ? props.friendFollowRequest._id : '',
    };

    props.updateFriend(input);
  };

  if (props.userId === props.authorizedUserId) {
    return null;
  }

  return (
    <View>
      {
        isFriendFollowRequestAccepted && (
          <View style={style.buttonsAddDeleteWraper}>
            <RegularButton
              isInverted={true}
              title='DELETE FRIEND'
              fontSize={10}
              onPress={onPressDeleteFriend}
            />
          </View>
        )
      }
      {
        isFriendFollowRequestDeclined && (
          <View style={style.buttonsAddDeleteWraper}>
            <RegularButton
              title='ADD FRIEND'
              fontSize={10}
              onPress={onPressAddFriend}
            />
          </View>
        )
      }
      {
        isFriendFollowRequestPendingForMe && (
          <View style={style.buttonsAcceptDeclineWraper}>
            <View style={style.buttonsAcceptDecline}>
              <RegularButton
                title='ACCEPT'
                fontSize={10}
                onPress={onPressAcceptFriend}
              />
            </View>
            <View style={style.buttonsAcceptDecline}>
              <RegularButton
                isInverted={true}
                title='DECLINE'
                fontSize={10}
                onPress={onPressDeleteFriend}
              />
            </View>
          </View>
        )
      }
      {
        isFriendFollowRequestPendingForUser && (
          <View style={style.buttonCancelWraper}>
            <RegularButton
              title='CANCEL REQUEST'
              fontSize={10}
              onPress={onPressDeleteFriend}
              isInverted={true}
            />
          </View>
        )
      }
    </View>
  );
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FriendsRewals);
