import { createStackNavigator } from 'react-navigation';

import ProfileScreen from './ProfileScreen';
import FriendsScreen from './FriendsScreen';

import navService from '../../../../../shared/services/nav.service';

export default createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    FriendsScreen: {
      screen: FriendsScreen,
      navigationOptions: navService.navigationOptions('Friends'),
    },
  }
  , {
    initialRouteName: 'ProfileScreen',
  });
