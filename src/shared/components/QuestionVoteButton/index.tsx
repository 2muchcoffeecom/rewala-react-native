import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import style from './style';

interface OwnProps {
  color: string;
  title: string;
  questionOptionId: string;
}

type Props = OwnProps & TouchableOpacityProps;

const QuestionVoteButton: React.FunctionComponent<Props> = (props) => {
  const {color, title, ...rest} = props;

  const onPressButton = () => {
  };

  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={[style.button, {borderLeftColor: color}]}
      {...rest}
    >
      <Text style={style.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(QuestionVoteButton);
