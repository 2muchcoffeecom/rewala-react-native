import { createStackNavigator } from 'react-navigation';

import SearchUserScreen from './SearchUserScreen';

export default createStackNavigator({
    SearchUserScreen: {
      screen: SearchUserScreen,
      navigationOptions: {
        header: null,
      },
    },
  }
  , {
    initialRouteName: 'SearchUserScreen',
  });
