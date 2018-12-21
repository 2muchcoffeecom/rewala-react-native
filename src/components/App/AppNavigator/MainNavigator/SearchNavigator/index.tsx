import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BackImage from '../../../../../shared/components/BackImage';

import navService from '../../../../../shared/services/nav.service';

import SearchUserScreen from './SearchUserScreen';
import ProfileFriendScreen from '../ProfileNavigator/ProfileFriendScreen';
import FriendsScreen from '../ProfileNavigator/FriendsScreen';

export default createStackNavigator({
    SearchUserScreen: {
      screen: SearchUserScreen,
      navigationOptions: {
        header: null,
      },
    },
    ProfileFriendScreen: {
      screen: ProfileFriendScreen,
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
