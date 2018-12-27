import React from 'react';
import { View, KeyboardTypeOptions, TextInput, Image, TouchableOpacity } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import { greyColorAddRewal } from '../../../app.style';

export interface OwnProps {
  keyboard?: KeyboardTypeOptions;
  placeholder?: string;
  editable?: boolean;
  maxLength?: number;
  borderColor: string;
  onPressRemoveInputButton?: () => void;
}

type Props = OwnProps & WrappedFieldProps;

export const OptionInput: React.FunctionComponent<Props> = (props: Props) => {
  const {
    placeholder, keyboard, editable, maxLength, onPressRemoveInputButton,
    input: {onChange, onFocus, ...restInput},
  } = props;

  return (
    <View style={style.root}>
      <View style={[style.inputContainer, {borderLeftColor: props.borderColor}]}>
        <TextInput
          {...restInput}
          onChangeText={onChange}
          onFocus={onFocus as any}
          placeholder={placeholder}
          placeholderTextColor={greyColorAddRewal}
          editable={editable}
          keyboardType={keyboard}
          style={[style.inputText]}
          maxLength={maxLength && maxLength}
        />
        {
          !!onPressRemoveInputButton &&
          <TouchableOpacity
            onPress={onPressRemoveInputButton}
            style={style.deleteButton}
          >
            <Image
              source={require('../../../../assets/delete-cross.png')}
              style={style.crossImage}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default OptionInput;