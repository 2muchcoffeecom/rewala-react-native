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
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/home-filled.png') :
                require('../../../../../assets/home.png')
            }
            resizeMode='contain'
            style={style.homeImage}
          />
        );
      } else if (routeName === 'SearchNavigator') {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/search-filled.png') :
                require('../../../../../assets/search.png')
            }
            resizeMode='contain'
            style={style.searchImage}
          />
        );
      } else if (routeName === 'NotificationNavigator') {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/notification-filled.png') :
                require('../../../../../assets/notification.png')
            }
            resizeMode='contain'
            style={style.notificationImage}
          />
        );
      } else {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/profile-filled.png') :
                require('../../../../../assets/profile.png')
            }
            resizeMode='contain'
            style={style.profileImage}
          />
        );
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
