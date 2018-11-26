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
  type?: 'number';
}

type Props = OwnProps & WrappedFieldProps;

export const Input: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, labelText, keyboard, editable, isSecureTextEntry, type,
    input: {onChange, onFocus, ...restInput},
    meta: {touched, error},
  } = props;

  const handleChangeNumberInput = (text: string): void => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    onChange(onlyNumbers);
  };

  return (
    <View style={style.root}>
      {labelText && <FormLabel>{labelText}</FormLabel>}
      <FormInput
        {...restInput}
        secureTextEntry={isSecureTextEntry}
        onChangeText={type === 'number' ? handleChangeNumberInput : onChange}
        onFocus={onFocus as any}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboard}
        containerStyle={
          touched && error ?
            [style.inputContainer, style.inputContainerError] :
            style.inputContainer
        }
        inputStyle={style.inputText}
      />
      {touched && (error &&
        <FormValidationMessage
          labelStyle={style.errorText}
          containerStyle={style.errorContainer}
        >
          {error}
        </FormValidationMessage>
      )}
    </View>
  );
};

export default Input;