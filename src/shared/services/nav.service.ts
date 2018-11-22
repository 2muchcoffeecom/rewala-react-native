import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';

import { headerTitleStyle, mainColor } from '../../app.style';

export interface NavOptions {
  title?: string;
  headerTitleStyle?: TextStyle;
  headerTitleContainerStyle?: ViewStyle;
  headerTintColor?: string;
  headerBackTitle: string | null;
  headerTransparent?: boolean;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
  headerStyle?: ViewStyle;
}

interface INavService {
  setNavigator(ref: NavigationContainerComponent): void;
  setParams(key: string, params: any): void;
  navigate(routeName: string, params?: any): void;
  back(key?: string): void;
  navigationOptions(title?: string): NavOptions;
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

  navigationOptions(title?: string): NavOptions {
    return {
      title,
      headerTitleStyle,
      headerStyle: {borderBottomWidth: 0},
      headerTitleContainerStyle: {justifyContent: 'center'},
      headerTintColor: mainColor,
      headerBackTitle: null,
      headerTransparent: true,
    };
  }

}

export default new NavService();