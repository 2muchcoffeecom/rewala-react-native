import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import style from './style';

interface OwnProps {
  color: string;
  isActive: boolean;
}

type Props = OwnProps & TouchableOpacityProps;

const QuestionTitleColorButton: React.FunctionComponent<Props> = (props) => {
  const {color, isActive, ...rest} = props;

  return (
    <TouchableOpacity
      style={
        isActive ?
          [style.buttonActive, {backgroundColor: color}] :
          [style.button, {backgroundColor: color}]
      }
      {...rest}
    />
  );
};

export default React.memo(QuestionTitleColorButton);
