import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icon } from '../Icon';
import style from './style';
import { mainColor } from '../../../app.style';

interface OwnProps {
  checked: boolean;
}

type Props = OwnProps & TouchableOpacityProps;

const CheckBoxInput: React.FunctionComponent<Props> = (props) => {
  const {checked, ...rest} = props;

  return (
    <TouchableOpacity
      style={style.checkbox}
      {...rest}
    >
      {
        checked &&
        <Icon
          name='checkbox-selected'
          size={17}
          color={mainColor}
        />
      }
    </TouchableOpacity>
  );
};

export default React.memo(CheckBoxInput);
