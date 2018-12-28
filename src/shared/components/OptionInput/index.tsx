import React from 'react';
import { View, KeyboardTypeOptions, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import { greyColorAddRewal, greyColorIcon } from '../../../app.style';

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
            <Icon
              name='delete-option'
              size={12}
              color={greyColorIcon}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default OptionInput;