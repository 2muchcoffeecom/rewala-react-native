import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordCodeScreen from './ResetPasswordCodeScreen';
import NewPasswordScreen from './NewPasswordScreen';
import NoFriendsScreen from './NoFriendsScreen';
import AddFriendsScreen from './AddFriendsScreen';

import navService from '../../../../shared/services/nav.service';
import HeaderLogo from '../../../../shared/components/HeaderLogo';

export default createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  RegistrationScreen: {
    screen: RegistrationScreen,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  ResetPasswordCodeScreen: {
    screen: ResetPasswordCodeScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewPasswordScreen: {
    screen: NewPasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  NoFriendsScreen: {
    screen: NoFriendsScreen,
    navigationOptions: navService.navigationOptions(<HeaderLogo/>),
  },
  AddFriendsScreen: {
    screen: AddFriendsScreen,
    navigationOptions: navService.navigationOptions(<HeaderLogo/>),
  },
}, {
  initialRouteName: 'LoginScreen',
});
