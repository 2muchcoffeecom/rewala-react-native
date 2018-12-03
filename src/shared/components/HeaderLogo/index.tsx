import React from 'react';
import { Image } from 'react-native';

const HeaderLogo: React.FunctionComponent = () => {
  return (
    <Image
      source={require('../../../../assets/logo.png')}
      style={{ width: 101, height: 21 }}
    />
  );
};

export default HeaderLogo;
