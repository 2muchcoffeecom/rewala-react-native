import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View } from 'react-native';
import RegularButton from '../RegularButton';

import { UpdateFollowRequestInput } from '../../services/friend.service';
import { Dispatch } from 'redux';
import { FollowRequest, FollowRequestStatus } from '../../models/followRequest.model';

import { Actions as friendsActions } from '../../../redux/friends/AC';

interface OwnProps {
  userId: string;
  friendFollowRequest?: FollowRequest;
  isFriendFollowRequestAccepted?: boolean;
  isFriendFollowRequestDeclined?: boolean;
  isFriendFollowRequestPendingForMe?: boolean;
  isFriendFollowRequestPendingForUser?: boolean;
}

interface DispatchProps {
  addFriend(data: string): void;
  updateFriend(data: UpdateFollowRequestInput): void;
}

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

type Props = OwnProps & DispatchProps;

const FriendsRewals: React.FunctionComponent<Props> = (props) => {
  const {
    isFriendFollowRequestAccepted,
    isFriendFollowRequestDeclined,
    isFriendFollowRequestPendingForMe,
    isFriendFollowRequestPendingForUser,
  } = props;

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

export default connect<null, DispatchProps>(null, mapDispatchToProps)(FriendsRewals);
