import {
  createMaterialTopTabNavigator,
  createNavigationContainer,
  NavigationScreenConfig, NavigationScreenOptions,
  TabNavigatorConfig,
} from 'react-navigation';
import { blackColor, greyColor } from '../../../../../../../app.style';
import style from './style';

import FriendsRewalsScreen from './FriendsRewalsScreen';
import MyRewalsScreen from './MyRewalsScreen';

interface CustomMaterialTopTabNavigatorConfig extends TabNavigatorConfig {
  defaultNavigationOptions: NavigationScreenConfig<NavigationScreenOptions>;
}

const Navigator = createMaterialTopTabNavigator({
  MyRewalsScreen,
  FriendsRewalsScreen,
}, {
  initialRouteName: 'FriendsRewalsScreen',
  swipeEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: blackColor,
    inactiveTintColor: greyColor,
    indicatorStyle: style.indicatorStyle,
    labelStyle: style.textLabel,
    style: style.tabBarStyle,
  },
  defaultNavigationOptions: ({navigation}) => ({
    tabBarLabel: navigation.state.routeName === 'FriendsRewalsScreen' ? `Friends' Rewals` : 'My Rewals',
  }),
} as CustomMaterialTopTabNavigatorConfig);

export default createNavigationContainer(Navigator);
