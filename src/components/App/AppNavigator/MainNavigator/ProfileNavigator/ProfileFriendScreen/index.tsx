import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import FriendUserRewals from '../../../../../../shared/components/FriendUserRewals';
import NoRewals from '../../../../../../shared/components/NoRewals';
import RegularButton from '../../../../../../shared/components/RegularButton';

import { NavigationInjectedProps, NavigationScreenConfig, NavigationStackScreenOptions } from 'react-navigation';
import { Dispatch } from 'redux';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { RootState } from '../../../../../../redux/store';
import { UpdateFollowRequestInput } from '../../../../../../shared/services/friend.service';
import { FriendNavigationProps } from '../../../../../../shared/components/FriendListItem';

import navService from '../../../../../../shared/services/nav.service';
import selectorsService from '../../../../../../shared/services/selectors.service';
import { apiEndpoint } from '../../../../../../shared/constants/apiEndpoint';
import { Actions as friendsActions } from '../../../../../../redux/friends/AC';
import { FollowRequestStatus } from '../../../../../../shared/models/followRequest.model';

interface StateProps {
  friendProfile: ProfileModel | undefined;
  authorizedUserId: string;
}

interface DispatchProps {
  addFriend(data: string): void;
  deleteFriend(data: UpdateFollowRequestInput): void;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  friendProfile: selectorsService.getFriendProfileByUserId(state, props),
  authorizedUserId: state.auth.authorizedUserId,
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

interface NavigationParams extends FriendNavigationProps {
  title: string;
}

type Props = StateProps & DispatchProps & NavigationInjectedProps<NavigationParams>;

class ProfileFriendScreen extends React.Component<Props> {
  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('title', ''),
    };
  }

  componentDidMount() {
    const {friendProfile} = this.props;

    this.props.navigation.setParams({
      title: friendProfile ? friendProfile.fullName : '',
    });
  }

  componentDidUpdate(prevProps: Props) {
    const {friendProfile} = this.props;

    if (friendProfile !== prevProps.friendProfile) {
      this.props.navigation.setParams({
        title: friendProfile ? friendProfile.fullName : '',
      });
    }
  }

  onPressAddFriend = () => {
    const userId = this.props.navigation.getParam('userId', '');

    this.props.addFriend(userId);
  }

  onPressDeleteFriend = () => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    const input: UpdateFollowRequestInput = {
      status: FollowRequestStatus.DECLINED,
      _id: friendFollowRequest ? friendFollowRequest._id : '',
    };

    this.props.deleteFriend(input);
  }

  onPressAcceptFriend = () => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    const input: UpdateFollowRequestInput = {
      status: FollowRequestStatus.ACCEPTED,
      _id: friendFollowRequest ? friendFollowRequest._id : '',
    };

    this.props.deleteFriend(input);
  }

  onPressButtonFriends = () => {
    navService.navigate('UserFriendsScreen');
  }

  isFriendFollowRequestAccepted = (): boolean => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    return !!friendFollowRequest && friendFollowRequest.status === FollowRequestStatus.ACCEPTED;
  }

  isFriendFollowRequestPendingForMe = (): boolean => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    return !!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.PENDING &&
      friendFollowRequest.toUserId === this.props.authorizedUserId;
  }

  isFriendFollowRequestPendingForUser = (): boolean => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    return !!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.PENDING &&
      friendFollowRequest.fromUserId === this.props.authorizedUserId;
  }

  isFriendFollowRequestDeclined = (): boolean => {
    const friendFollowRequest = this.props.navigation.getParam('friendFollowRequest');

    return !!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.DECLINED;
  }

  getButtonShowFriend() {
    const {friendProfile} = this.props;

    if (this.isFriendFollowRequestAccepted()) {
      return (
        <TouchableOpacity
          style={style.buttonFriend}
          onPress={this.onPressButtonFriends}
        >
          <Text style={style.text}>
            <Text style={style.textBold}>{friendProfile && `${friendProfile.friendsCount} `}</Text>
            Friends
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={style.buttonFriend}>
        <Text style={style.text}>
          <Text style={style.textBold}>{friendProfile && `${friendProfile.friendsCount} `}</Text>
          Friends
        </Text>
      </View>
    );
  }

  getButtonFriendStatus() {
    if (this.isFriendFollowRequestAccepted()) {
      return (
        <View style={style.buttonsAddDeleteWraper}>
          <RegularButton
            isInverted={true}
            title='DELETE FRIEND'
            fontSize={10}
            onPress={this.onPressDeleteFriend}
          />
        </View>
      );
    } else if (this.isFriendFollowRequestDeclined()) {
      return (
        <View style={style.buttonsAddDeleteWraper}>
          <RegularButton
            title='ADD FRIEND'
            fontSize={10}
            onPress={this.onPressAddFriend}
          />
        </View>
      );
    } else if (this.isFriendFollowRequestPendingForMe()) {
      return (
        <View style={style.buttonsAcceptDeclineWraper}>
          <View style={style.buttonsAcceptDecline}>
            <RegularButton
              title='ACCEPT'
              fontSize={10}
              onPress={this.onPressAcceptFriend}
            />
          </View>
          <View style={style.buttonsAcceptDecline}>
            <RegularButton
              isInverted={true}
              title='DECLINE'
              fontSize={10}
              onPress={this.onPressDeleteFriend}
            />
          </View>
        </View>
      );
    }

    return null;
  }

  render() {
    const {friendProfile} = this.props;

    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.userInfo}>
          <View style={style.wraperUser}>
            <View style={style.avatarWraper}>
              <Image
                source={
                  friendProfile && friendProfile.avatarPath ?
                    {uri: `${apiEndpoint}/graphql/${friendProfile.avatarPath}`} :
                    require('../../../../../../../assets/avatar-placeholder.png')
                }
                resizeMode='contain'
                style={style.image}
              />
            </View>
            <View style={style.textAndButtonWraper}>
              <View style={style.textWraper}>
                {this.getButtonShowFriend()}
                <Text style={style.text}>
                  <Text style={style.textBold}>{friendProfile && `${friendProfile.rewalsCount} `}</Text>
                  Rewals
                </Text>
              </View>
              {this.getButtonFriendStatus()}
            </View>
          </View>
        </View>
        {
          this.isFriendFollowRequestAccepted() ? <FriendUserRewals/> : <NoRewals/>
        }
      </ScrollView>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ProfileFriendScreen);