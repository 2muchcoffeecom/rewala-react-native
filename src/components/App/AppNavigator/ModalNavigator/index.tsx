import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AddRewalScreen from './AddRewalScreen';

import navService from '../../../../shared/services/nav.service';
import BackImage from '../../../../shared/components/BackImage';

export default createStackNavigator({
  AddRewalScreen: {
    screen: AddRewalScreen,
    navigationOptions: {
      ...navService.navigationOptions('Create New Question', <BackImage/>),
    },
  },
}, {
  initialRouteName: 'AddRewalScreen',
  mode: 'modal',

});
