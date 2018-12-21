import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import FriendUserRewals from '../../../../../../shared/components/FriendUserRewals';
import NoRewals from '../../../../../../shared/components/NoRewals';
import ButtonFollowRequest from '../../../../../../shared/components/ButtonFollowRequest';
import AvatarProfile from '../../../../../../shared/components/AvatarProfile';

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
  friendFollowRequest: selectorsService.getFriendFollowRequestByUserIdFromNavProps(state, props),
});

interface NavigationParams extends FriendNavigationProps {
  title: string;
}

type Props = StateProps & NavigationInjectedProps<NavigationParams>;

interface State {
  isVisibleAvatarModal: boolean;
  avatarRatio: number;
}

class ProfileFriendScreen extends React.Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('title', ''),
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleAvatarModal: false,
      avatarRatio: 1,
    };
  }

  componentDidMount() {
    const {friendProfile} = this.props;

    this.props.navigation.setParams({
      title: friendProfile ? friendProfile.fullName : '',
    });

    if (this.props.friendProfile) {
      Image.getSize(
        `${apiEndpoint}/${this.props.friendProfile.avatarPath}`,
        ((width, height) => {
            this.setState({
              avatarRatio: width / height,
            });
          }
        ),
        () => {
        },
      );
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {friendProfile} = this.props;

    if (friendProfile !== prevProps.friendProfile) {
      this.props.navigation.setParams({
        title: friendProfile ? friendProfile.fullName : '',
      });

      if (this.props.friendProfile) {
        Image.getSize(
          `${apiEndpoint}/${this.props.friendProfile.avatarPath}`,
          ((width, height) => {
              this.setState({
                avatarRatio: width / height,
              });
            }
          ),
          () => {
          },
        );
      }
    }
  }

  toggleModalVisibility = () => {
    this.setState((state) => ({
      isVisibleAvatarModal: !state.isVisibleAvatarModal,
    }));
  }

  onPressButtonFriends = () => {
    const params: FriendNavigationProps = {
      userId: this.props.navigation.getParam('userId'),
      friendFollowRequestId: this.props.navigation.getParam('friendFollowRequestId'),
    };
    navService.push('FriendsScreen', params);
  }

  isFriendFollowRequestAccepted = (): boolean => {
    const {friendFollowRequest} = this.props;
    return !!friendFollowRequest && friendFollowRequest.status === FollowRequestStatus.ACCEPTED;
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
              {
                friendProfile && friendProfile.avatarPath ?
                  (
                    <AvatarProfile
                      profile={friendProfile}
                      isVisible={this.state.isVisibleAvatarModal}
                      avatarRatio={this.state.avatarRatio}
                      toggleVisibility={this.toggleModalVisibility}
                    />
                  ) : (
                    <View
                      style={style.avatarWraper}
                    >
                      <Image
                        source={require('../../../../../../../assets/avatar-placeholder.png')}
                        style={style.image}
                      />
                    </View>
                  )
              }
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