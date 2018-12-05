import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import style from './style';

interface OwnProps {
  isInverted?: boolean;
}

type Props = OwnProps & ButtonProps;

const RegularButton: React.FunctionComponent<Props> = (props) => {
  const {isInverted, fontSize, ...restProps} = props;

  return (
    <Button
      buttonStyle={
        isInverted ? [style.button, style.buttonInverted] : style.button
      }
      containerViewStyle={style.container}
      textStyle={
        isInverted ?
          fontSize ?
            [style.buttonTitle, style.buttonTitleInverted, {fontSize}] :
            [style.buttonTitle, style.buttonTitleInverted] :
          fontSize ?
            [style.buttonTitle, {fontSize}] :
            style.buttonTitle
      }
      {...restProps}
    />
  );
};

export default RegularButton;
