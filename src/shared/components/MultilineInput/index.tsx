import React from 'react';
import { View, KeyboardTypeOptions, TextInput } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import { whiteColor } from '../../../app.style';

export interface OwnProps {
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
  maxLength?: number;
  color?: string;
}

type Props = OwnProps & WrappedFieldProps;

export const MultilineInput: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, keyboard, editable, maxLength, color,
    input: {onChange, onFocus, ...restInput},
  } = props;

  return (
    <View style={style.root}>
      <TextInput
        {...restInput}
        onChangeText={onChange}
        onFocus={onFocus as any}
        placeholder={placeholder}
        placeholderTextColor={color ? color : whiteColor}
        editable={editable}
        multiline={true}
        keyboardType={keyboard}
        style={
          color ?
            [style.inputText, {color}] :
            style.inputText
        }
        maxLength={maxLength && maxLength}
      />
    </View>
  );
};

export default MultilineInput;