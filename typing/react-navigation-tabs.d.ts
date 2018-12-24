declare module 'react-navigation-tabs' {
  import { BottomTabNavigatorConfig, NavigationContainer, NavigationRouteConfigMap } from 'react-navigation';
  import React from 'react';
  import { TabBarBottomProps } from 'react-navigation';

  export class BottomTabBar extends React.Component<TabBarBottomProps> {
  }

  export function createBottomTabNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    drawConfig?: BottomTabNavigatorConfig,
  ): NavigationContainer;

}