import React from 'react';
import BackImage from '../../../../../shared/components/BackImage';
import { createStackNavigator } from 'react-navigation';

import ProfileScreen from './ProfileScreen';
import ProfileSettingsScreen from './ProfileSettingsScreen';
import FriendsScreen from './FriendsScreen';
import ProfileOfUserScreen from './ProfileOfUserScreen';

import navService from '../../../../../shared/services/nav.service';

export default createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: navService.navigationOptions(),
    },
    ProfileSettingsScreen: {
      screen: ProfileSettingsScreen,
      navigationOptions: navService.navigationOptions('Profile Settings', <BackImage/>),
    },
    FriendsScreen: {
      screen: FriendsScreen,
      navigationOptions: navService.navigationOptions('Friends', <BackImage/>),
    },
    ProfileOfUserScreen: {
      screen: ProfileOfUserScreen,
      navigationOptions: navService.navigationOptions('', <BackImage/>),
    },
  }
  , {
    initialRouteName: 'ProfileScreen',
  });
