import React from 'react';
import { View, KeyboardTypeOptions } from 'react-native';
import { FormInput } from 'react-native-elements';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import { greyColorAddRewal } from '../../../app.style';

export interface OwnProps {
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
  maxLength?: number;
  borderColor: string;
}

type Props = OwnProps & WrappedFieldProps;

export const OptionInput: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, keyboard, editable, maxLength,
    input: {onChange, onFocus, ...restInput},
  } = props;

  return (
    <View style={style.root}>
      <FormInput
        {...restInput}
        onChangeText={onChange}
        onFocus={onFocus as any}
        placeholder={placeholder}
        placeholderTextColor={greyColorAddRewal}
        editable={editable}
        keyboardType={keyboard}
        containerStyle={[style.inputContainer, {borderLeftColor: props.borderColor}]}
        inputStyle={style.inputText}
        maxLength={maxLength && maxLength}
      />
    </View>
  );
};

export default OptionInput;