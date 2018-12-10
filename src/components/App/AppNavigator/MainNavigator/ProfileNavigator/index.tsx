import React from 'react';
import BackImage from '../../../../../shared/components/BackImage';
import { createStackNavigator } from 'react-navigation';

import ProfileScreen from './ProfileScreen';
import FriendsScreen from './FriendsScreen';

import navService from '../../../../../shared/services/nav.service';

export default createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: navService.navigationOptions(),
    },
    FriendsScreen: {
      screen: FriendsScreen,
      navigationOptions: navService.navigationOptions('Friends', <BackImage/>),
    },
  }
  , {
    initialRouteName: 'ProfileScreen',
  });
