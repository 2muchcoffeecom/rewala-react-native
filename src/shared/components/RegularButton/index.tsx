import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import style from './style';

type Props = ButtonProps;

const RegularButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button
      buttonStyle={style.button}
      containerViewStyle={style.container}
      textStyle={
        props.fontSize ? [style.buttonTitle, {fontSize: props.fontSize}] : style.buttonTitle
      }
      {...props}
    />
  );
};

export default RegularButton;
