import React from 'react';
import { createStackNavigator } from 'react-navigation';

import navService from '../../../../shared/services/nav.service';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';

export default createStackNavigator({
  LoginScreen: {
    screen: SignupScreen,
    navigationOptions: navService.navigationOptions('Login'),
  },
  RegistrationScreen: {
    screen: SigninScreen,
    navigationOptions: navService.navigationOptions('Registration'),
  },
}, {
  initialRouteName: 'LoginScreen',
});
