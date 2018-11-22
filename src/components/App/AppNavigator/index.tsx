import React from 'react';
import { createSwitchNavigator, NavigationContainerComponent } from 'react-navigation';

import SplashScreen from './SplashScreen';
import AuthNavigator from './AuthNavigator';
import DoubleBackExit from '../../../shared/components/DoubleBackExit';
import navService from '../../../shared/services/nav.service';

const Navigator = createSwitchNavigator({
  SplashScreen,
  AuthNavigator,
}, {
  initialRouteName: 'SplashScreen',
});

export default class AppNavigator extends React.Component {
  setNavigator(navigatorRef: NavigationContainerComponent): void {
    navService.setNavigator(navigatorRef);
  }

  render() {
    return (
      <DoubleBackExit>
        <Navigator
          ref={this.setNavigator}
        />
      </DoubleBackExit>
    );
  }
}
