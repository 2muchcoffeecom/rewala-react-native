import React, { Component } from 'react';
import { View, Image } from 'react-native';
import style from './style';

import authService from '../../../../shared/services/auth.service';
import navService from '../../../../shared/services/nav.service';

export default class SplashScreen extends Component {
  constructor(props: {}) {
    super(props);
    const subscriber = authService.getToken().subscribe(token => {
      navService.navigate(/*token ? 'MainNavigator' : */'AuthNavigator');
      subscriber.unsubscribe();
    });
  }

  render() {
    return (
      <View style={style.root}>
        <Image
          source={require('../../../../../assets/logo.png')}
          resizeMode='contain'
          style={style.image}
        />
      </View>
    );
  }
}
