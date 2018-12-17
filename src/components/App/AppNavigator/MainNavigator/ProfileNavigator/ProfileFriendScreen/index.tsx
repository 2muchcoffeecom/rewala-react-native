import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import FriendUserRewals from '../../../../../../shared/components/FriendUserRewals';
import NoRewals from '../../../../../../shared/components/NoRewals';
import ButtonFollowRequest from '../../../../../../shared/components/ButtonFollowRequest';

import { NavigationInjectedProps, NavigationScreenConfig, NavigationStackScreenOptions } from 'react-navigation';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { RootState } from '../../../../../../redux/store';
import { FriendNavigationProps } from '../../../../../../shared/components/FriendListItem';
import { FollowRequest, FollowRequestStatus } from '../../../../../../shared/models/followRequest.model';

import navService from '../../../../../../shared/services/nav.service';
import selectorsService from '../../../../../../shared/services/selectors.service';
import { apiEndpoint } from '../../../../../../shared/constants/apiEndpoint';

interface StateProps {
  friendProfile: ProfileModel | undefined;
  friendFollowRequest: FollowRequest | undefined;
  authorizedUserId: string;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  friendProfile: selectorsService.getFriendProfileByUserId(state, props),
  authorizedUserId: state.auth.authorizedUserId,
  friendFollowRequest: selectorsService.getFriendFollowRequestById(state, props),
});

interface NavigationParams extends FriendNavigationProps {
  title: string;
}

type Props = StateProps & NavigationInjectedProps<NavigationParams>;

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

  onPressButtonFriends = () => {
    navService.navigate('UserFriendsScreen');
  }

  isFriendFollowRequestAccepted = (): boolean => {
    const {friendFollowRequest} = this.props;
    return !!friendFollowRequest && friendFollowRequest.status === FollowRequestStatus.ACCEPTED;
  }

  isFriendFollowRequestPendingForMe = (): boolean => {
    const {friendFollowRequest} = this.props;
    return !!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.PENDING &&
      friendFollowRequest.toUserId === this.props.authorizedUserId;
  }

  isFriendFollowRequestPendingForUser = (): boolean => {
    const {friendFollowRequest} = this.props;
    return !!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.PENDING &&
      friendFollowRequest.fromUserId === this.props.authorizedUserId;
  }

  isFriendFollowRequestDeclined = (): boolean => {
    const {friendFollowRequest} = this.props;
    return (!!friendFollowRequest &&
      friendFollowRequest.status === FollowRequestStatus.DECLINED) || !friendFollowRequest;
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

  render() {
    const {friendProfile, friendFollowRequest} = this.props;
    const userId = this.props.navigation.getParam('userId', '');

    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.userInfo}>
          <View style={style.wraperUser}>
            <View style={style.avatarWraper}>
              <Image
                source={
                  friendProfile && friendProfile.avatarPath ?
                    {uri: `${apiEndpoint}/${friendProfile.avatarPath}`} :
                    require('../../../../../../../assets/avatar-placeholder.png')
                }
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
              <ButtonFollowRequest
                userId={userId}
                friendFollowRequest={friendFollowRequest}
                isFriendFollowRequestAccepted={this.isFriendFollowRequestAccepted()}
                isFriendFollowRequestDeclined={this.isFriendFollowRequestDeclined()}
                isFriendFollowRequestPendingForMe={this.isFriendFollowRequestPendingForMe()}
                isFriendFollowRequestPendingForUser={this.isFriendFollowRequestPendingForUser()}
              />
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

export default connect<StateProps>(mapStateToProps)(ProfileFriendScreen);