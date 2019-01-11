import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BackImage from '../../../../../shared/components/BackImage';

import navService from '../../../../../shared/services/nav.service';

import SearchUserScreen from './SearchUserScreen';
import ProfileOfUserScreen from '../ProfileNavigator/ProfileOfUserScreen';
import FriendsScreen from '../ProfileNavigator/FriendsScreen';

export default createStackNavigator({
    SearchUserScreen: {
      screen: SearchUserScreen,
      navigationOptions: {
        header: null,
      },
    },
    ProfileOfUserScreen: {
      screen: ProfileOfUserScreen,
      navigationOptions: navService.navigationOptions('', <BackImage/>),
    },
    FriendsScreen: {
      screen: FriendsScreen,
      navigationOptions: navService.navigationOptions('Friends', <BackImage/>),
    },
  }
  , {
    initialRouteName: 'SearchUserScreen',
  });
