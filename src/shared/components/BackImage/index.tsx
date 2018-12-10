import React from 'react';
import { Image } from 'react-native';

const BackImage: React.FunctionComponent = () => {
  return (
    <Image
      source={require('../../../../assets/back.png')}
      style={{ width: 20, height: 14 }}
      resizeMode='contain'
    />
  );
};

export default BackImage;
