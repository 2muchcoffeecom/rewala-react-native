import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from './style';

import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import navService from '../../../shared/services/nav.service';

type Props = NavigationInjectedProps;

export interface AddRewalButtonNavParams {
  fromScreen: string;
}

const AddRewalButton: React.FunctionComponent<Props> = (props) => {
  const onPressAddButton = () => {
    const params: AddRewalButtonNavParams = {
      fromScreen: props.navigation.state.routeName,
    };

    navService.navigate('AddRewalScreen', params);
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

export default withNavigation(AddRewalButton);
