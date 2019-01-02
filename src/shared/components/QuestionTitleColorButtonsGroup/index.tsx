import React from 'react';
import { View } from 'react-native';
import { questionTitleColor } from '../../../app.style';
import QuestionTitleColorButton from '../QuestionTitleColorButton';
import style from './style';

interface OwnProps {
  onChangeColor(color: string): void;
  activeColor: string;
}

type Props = OwnProps;

const QuestionTitleColorButtonsGroup: React.FunctionComponent<Props> = (props) => {
  const {activeColor, onChangeColor} = props;

  return (
    <View style={style.root}>
      {
        questionTitleColor.map((color, index) => {
            const onPressButton = () => {
              onChangeColor(color);
            };

            return (
              <QuestionTitleColorButton
                color={color}
                key={index}
                isActive={color === activeColor}
                onPress={() => onPressButton()}
              />
            );
          },
        )
      }
    </View>
  );
};

export default React.memo(QuestionTitleColorButtonsGroup);
