import { createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';

import navService from '../../../../../shared/services/nav.service';

export default createStackNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: navService.navigationOptions('FEED'),
    },
  }
  , {
    initialRouteName: 'HomeScreen',
  });
