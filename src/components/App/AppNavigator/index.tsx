import React from 'react';
import {View} from 'react-native';
import {
  createAppContainer, createSwitchNavigator, NavigationContainerComponent,
} from 'react-navigation';

import SplashScreen from './SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import RootToast from '../../../shared/components/RootToast';
import navService from '../../../shared/services/nav.service';

const Navigator = createSwitchNavigator({
  SplashScreen,
  AuthNavigator,
  MainNavigator,
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
        <NavigatorContainer
          ref={this.setNavigator}
        />
        <RootToast/>
      </View>
    );
  }
}
