import React from 'react';
import { NavigationActions, StackActions, NavigationContainerComponent } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';

import { headerTitleStyle, headerStyle, headerTitleContainerStyle } from '../../app.style';

export interface NavOptions {
  title?: string;
  headerTitle?: React.ReactNode;
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
  navigationOptions(title?: string, headerBackImage?: JSX.Element): NavOptions;
  navigationOptionsHeaderLogo(headerTitle?: React.ReactNode): NavOptions;
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

  push(routeName: string, params?: any) {
    this.navigator && this.navigator.dispatch(
      StackActions.push({
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

  navigationOptions(title?: string, headerBackImage?: JSX.Element): NavOptions {
    return {
      title,
      headerTitleStyle,
      headerStyle,
      headerTitleContainerStyle,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerBackImage,
    };
  }

  navigationOptionsHeaderLogo(headerTitle?: React.ReactNode): NavOptions {
    return {
      headerTitle,
      headerTitleStyle,
      headerStyle,
      headerTitleContainerStyle,
      headerTransparent: true,
      headerBackTitleVisible: false,
    };
  }
}

export default new NavService();