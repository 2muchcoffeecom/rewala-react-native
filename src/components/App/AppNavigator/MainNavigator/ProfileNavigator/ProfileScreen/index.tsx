import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, Image, Text, TouchableOpacity } from 'react-native';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';
import RegularButton from '../../../../../../shared/components/RegularButton';
import ProfileScreenNavigator from './ProfileScreenNavigator';

import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { RootState } from '../../../../../../redux/store';

import navService from '../../../../../../shared/services/nav.service';
import selectorsService from '../../../../../../shared/services/selectors.service';
import { apiEndpoint } from '../../../../../../shared/constants/apiEndpoint';

interface StateProps {
  meProfile: ProfileModel | undefined;
}

const mapStateToProps = (state: RootState): StateProps => ({
  meProfile: selectorsService.getAuthorizedUserProfile(state),
});

type Props = StateProps;

class ProfileScreen extends React.Component<Props> {

  onPressButtonSettings = () => {
    navService.navigate('ProfileSettingsScreen');
  }

  onPressButtonFriends = () => {
    navService.navigate('FriendsScreen');
  }

  render() {
    const {meProfile} = this.props;

    return (
      <View style={style.root}>
        <View style={style.meInfo}>
          <View style={style.meNameWraper}>
            <Text style={style.meName}>{meProfile && meProfile.fullName}</Text>
          </View>
          <View style={style.wraperMe}>
            <View style={style.avatarWraper}>
              <Image
                source={
                  meProfile && meProfile.avatarPath ?
                    {uri: `${apiEndpoint}/graphql/${meProfile.avatarPath}`} :
                    require('../../../../../../../assets/avatar-placeholder.png')
                }
                resizeMode='contain'
                style={style.image}
              />
            </View>
            <View style={style.textAndButtonWraper}>
              <View style={style.textWraper}>
                <TouchableOpacity
                  style={style.buttonFriend}
                  onPress={this.onPressButtonFriends}
                >
                  <Text style={style.text}>
                    <Text style={style.textBold}>{meProfile && `${meProfile.friendsCount} `}</Text>
                    Friends
                  </Text>
                </TouchableOpacity>
                <Text style={style.text}>
                  <Text style={style.textBold}>{meProfile && `${meProfile.rewalsCount} `}</Text>
                  Rewals
                </Text>
              </View>
              <View style={style.buttonSettingsWraper}>
                <RegularButton
                  title='Profile Settings'
                  fontSize={13}
                  onPress={this.onPressButtonSettings}
                  isInverted={true}
                />
              </View>
            </View>
          </View>
        </View>
        <ProfileScreenNavigator/>
        <AddRewalButton/>
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(ProfileScreen);