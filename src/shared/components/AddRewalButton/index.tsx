import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from './style';

import navService from '../../../shared/services/nav.service';

const AddRewalButton: React.FunctionComponent = () => {
  const onPressAddButton = () => {
    navService.navigate('AddRewalScreen');
  };

  return (
      <TouchableOpacity
        style={style.addButton}
        onPress={onPressAddButton}
      >
        <Image
          style={style.image}
          source={require('../../../../assets/add-rewal.png')}
        />
      </TouchableOpacity>
  );
};

export default AddRewalButton;
