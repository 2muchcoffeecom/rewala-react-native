import React from 'react';
import { Image } from 'react-native';

const HeaderLogo: React.FunctionComponent = () => {
  return (
    <Image
      source={require('../../../../assets/logo.png')}
      style={{ width: 100, height: 21 }}
      resizeMode='contain'
    />
  );
};

export default HeaderLogo;
