import React from 'react';
import {
  createNavigationContainer, createSwitchNavigator, NavigationContainerComponent,
} from 'react-navigation';

import SplashScreen from './SplashScreen';
import AuthNavigator from './AuthNavigator';
import DoubleBackExit from '../../../shared/components/DoubleBackExit';
import RootToast from '../../../shared/components/RootToast';
import navService from '../../../shared/services/nav.service';

const Navigator = createSwitchNavigator({
  SplashScreen,
  AuthNavigator,
}, {
  initialRouteName: 'SplashScreen',
});

const NavigatorContainer = createNavigationContainer(Navigator); // until new @types

export default class AppNavigator extends React.Component {
  setNavigator(navigatorRef: NavigationContainerComponent): void {
    navService.setNavigator(navigatorRef);
  }

  render() {
    return (
      <DoubleBackExit>
        <NavigatorContainer
          ref={this.setNavigator}
        />
        <RootToast/>
      </DoubleBackExit>
    );
  }
}
