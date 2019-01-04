import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import style from './style';
import { whiteColor, linearGradientColors } from '../../../app.style';

import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../../shared/components/Icon';

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
    <View style={style.addButtonWraper}>
      <LinearGradient
        colors={linearGradientColors}
        useAngle={true}
        angle={43}
        style={style.gradient}
      >
        <TouchableOpacity
          style={style.addButton}
          onPress={onPressAddButton}
        >
          <Icon
            name='add-rewal'
            size={26}
            color={whiteColor}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default withNavigation(AddRewalButton);
