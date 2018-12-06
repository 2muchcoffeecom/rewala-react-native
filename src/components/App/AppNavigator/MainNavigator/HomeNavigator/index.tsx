import { createStackNavigator } from 'react-navigation';

import HomeBlankScreen from './HomeBlankScreen';

import navService from '../../../../../shared/services/nav.service';

export default createStackNavigator({
    HomeBlankScreen: {
      screen: HomeBlankScreen,
      navigationOptions: navService.navigationOptions('FEED'),
    },
  }
  , {
    initialRouteName: 'HomeBlankScreen',
  });
