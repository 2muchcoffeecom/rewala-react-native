import React from 'react';
import { View, KeyboardTypeOptions } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { WrappedFieldProps } from 'redux-form';
import style from './style';

export interface OwnProps {
  labelText?: string;
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
  isSecureTextEntry?: boolean;
}

type Props = OwnProps & WrappedFieldProps;

export const Input: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, labelText, keyboard, editable, isSecureTextEntry,
    input: {onChange, onFocus, ...restInput},
    meta: {touched, error},
  } = props;

  return (
    <View style={style.root}>
      {labelText && <FormLabel>{labelText}</FormLabel>}
      <FormInput
        {...restInput}
        secureTextEntry={isSecureTextEntry}
        onChangeText={onChange}
        onFocus={onFocus as any}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboard}
        containerStyle={style.inputContainer}
        inputStyle={style.inputText}
      />
      {touched && (error &&
        <FormValidationMessage
          labelStyle={style.errorText}
        >
          {error}
        </FormValidationMessage>
      )}
    </View>
  );
};

export default Input;