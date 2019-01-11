import React from 'react';
import { View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import {
  createAppContainer, createSwitchNavigator, NavigationContainerComponent,
} from 'react-navigation';

import RootToast from '../../../shared/components/RootToast';

import navService from '../../../shared/services/nav.service';

import SplashScreen from './SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ModalNavigator from './ModalNavigator';

const Navigator = createSwitchNavigator({
  SplashScreen,
  AuthNavigator,
  MainNavigator,
  ModalNavigator,
}, {
  initialRouteName: 'SplashScreen',
});

const NavigatorContainer = createAppContainer(Navigator);

export default class AppNavigator extends React.Component {
  setNavigator(navigatorRef: NavigationContainerComponent): void {
    navService.setNavigator(navigatorRef);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MenuProvider backHandler={true}>
          <NavigatorContainer
            ref={this.setNavigator}
          />
          <RootToast/>
        </MenuProvider>
      </View>
    );
  }
}
