import React from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigatorConfig,
  NavigationScreenConfig,
  NavigationBottomTabScreenOptions,
} from 'react-navigation';
import style from './style';

import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

interface CustomBottomTabNavigatorConfig extends BottomTabNavigatorConfig {
  defaultNavigationOptions: NavigationScreenConfig<NavigationBottomTabScreenOptions>;
}

const Navigator = createBottomTabNavigator({
  HomeNavigator,
  SearchNavigator: HomeNavigator,
  NotificationNavigator: HomeNavigator,
  ProfileNavigator,
}, {
  initialRouteName: 'HomeNavigator',
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;

      if (routeName === 'HomeNavigator') {
        return focused ?
          (<Image source={require('../../../../../assets/home-filled.png')} style={style.image}/>) :
          (<Image source={require('../../../../../assets/home.png')} style={style.image}/>);
      } else if (routeName === 'SearchNavigator') {
        return focused ?
          (<Image source={require('../../../../../assets/search-filled.png')} style={style.image}/>) :
          (<Image source={require('../../../../../assets/search.png')} style={style.image}/>);
      } else if (routeName === 'NotificationNavigator') {
        return focused ?
          (<Image source={require('../../../../../assets/notification-filled.png')} style={style.image}/>) :
          (<Image source={require('../../../../../assets/notification.png')} style={style.image}/>);
      } else {
        return focused ?
          (<Image source={require('../../../../../assets/profile-filled.png')} style={style.image}/>) :
          (<Image source={require('../../../../../assets/profile.png')} style={style.image}/>);
      }
    },
  }),
  tabBarOptions: {
    showLabel: false,
    tabStyle: style.tabStyle,
    style: style.style,
  },
} as CustomBottomTabNavigatorConfig);

export default class MainNavigator extends React.Component<any> {
  static router = Navigator.router;

  render() {
    return <Navigator navigation={this.props.navigation}/>;
  }
}
