import { createStackNavigator } from 'react-navigation';

import ProfileScreen from './ProfileScreen';

export default createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
  }
  , {
    initialRouteName: 'ProfileScreen',
  });
