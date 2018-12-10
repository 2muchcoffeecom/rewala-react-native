import React from 'react';
import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';

import { headerTitleStyle, headerStyle, headerTitleContainerStyle } from '../../app.style';

export interface NavOptions {
  headerTitle?: string | React.ReactNode;
  headerTitleStyle?: TextStyle;
  headerTitleContainerStyle?: ViewStyle;
  headerTintColor?: string;
  headerBackTitle?: string | null;
  headerTransparent?: boolean;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element | null;
  headerStyle?: ViewStyle;
  headerBackTitleVisible: boolean;
  headerBackImage?: JSX.Element;
}

interface INavService {
  setNavigator(ref: NavigationContainerComponent): void;
  setParams(key: string, params: any): void;
  navigate(routeName: string, params?: any): void;
  back(key?: string): void;
  navigationOptions(headerTitle?: string | React.ReactNode): NavOptions;
}

class NavService implements INavService {
  private navigator?: NavigationContainerComponent;

  setNavigator(ref: NavigationContainerComponent) {
    this.navigator = ref;
  }

  setParams(key: string, params: any) {
    this.navigator && this.navigator.dispatch(
      NavigationActions.setParams({
        key,
        params,
      }),
    );
  }

  navigate(routeName: string, params?: any) {
    this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  back(key?: string) {
    this.navigator && this.navigator.dispatch(
      NavigationActions.back({
        key,
      }),
    );
  }

  navigationOptions(headerTitle?: string | React.ReactNode, headerBackImage?: JSX.Element): NavOptions {
    return {
      headerTitle,
      headerTitleStyle,
      headerStyle,
      headerTitleContainerStyle,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerBackImage,
      headerLeft: headerBackImage ? undefined : null,
    };
  }
}

export default new NavService();