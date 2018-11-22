import React from 'react';
import { View, KeyboardTypeOptions} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { WrappedFieldProps } from 'redux-form';
import style from './style';

export interface OwnProps {
  labelText?: string;
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
}

type Props = OwnProps & WrappedFieldProps;

export const Input: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, labelText, keyboard, editable,
    input: {onChange, onFocus, ...restInput},
    meta: {touched, error},
  } = props;

  return (
    <View>
      <FormLabel>{labelText}</FormLabel>
      <FormInput
        {...restInput}
        onChangeText={onChange}
        onFocus={onFocus as any}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboard}
        style={style.textInput}
      />
      {touched && (error &&
          <FormValidationMessage>{error}</FormValidationMessage>
      )}
    </View>
  );
};

export default Input;