// import React from 'react';
import { createStackNavigator } from 'react-navigation';

// import navService from '../../../../shared/services/nav.service';
import LoginScreen from './LoginScreen';
// import RegistrationScreen from './RegistrationScreen';

export default createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  // RegistrationScreen: {
  //   screen: RegistrationScreen,
  //   navigationOptions: navService.navigationOptions('Registration'),
  // },
}, {
  initialRouteName: 'LoginScreen',
});
