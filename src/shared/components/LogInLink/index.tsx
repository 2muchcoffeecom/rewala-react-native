import React from 'react';
import { Text } from 'react-native';
import style from './style';

import navService from '../../services/nav.service';

const LogInLink: React.FunctionComponent = () => {
  const toLoginScreen = () => {
    navService.navigate('LoginScreen');
  };

  return (
    <Text style={style.text}>
      {'Already have an account? '.toUpperCase()}
      <Text
        onPress={toLoginScreen}
        style={style.textLink}
      >
        LOG IN
      </Text>
    </Text>
  );
};

export default React.memo(LogInLink);
