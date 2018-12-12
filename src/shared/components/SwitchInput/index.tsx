import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import { mainColor } from '../../../app.style';

type Props = SwitchProps & WrappedFieldProps;

export const SwitchInput: React.FunctionComponent<Props> = (props: Props) => {
  const {input: {onChange, ...restInput}, meta, ...restProps} = props;

  return (
    <Switch
      onValueChange={onChange}
      {...restInput}
      thumbColor={restInput.value ? mainColor : '#D9D9D9'}
      trackColor={{false: '#D8D8D8', true: '#D8D8D8'}}
      {...restProps}
      style={style.switch}
    />
  );
};

export default SwitchInput;