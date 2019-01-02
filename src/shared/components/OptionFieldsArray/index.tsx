import React from 'react';
import style from './style';
import { mainColor } from '../../../app.style';

import { View, TouchableOpacity } from 'react-native';
import { Field, WrappedFieldArrayProps, WrappedFieldProps } from 'redux-form';
import OptionInput from '../../../shared/components/OptionInput';
import { Icon } from '../../../shared/components/Icon';

import { QuestionOptionsColor } from '../../../app.style';

type Props = WrappedFieldProps & WrappedFieldArrayProps<any>;

const OptionFieldsArray: React.FunctionComponent<Props> = (props: Props) => {
  const {fields} = props;
  const onPressAddButton = () => fields.push('');

  const renderOptionsFields = () => fields.map((optionItem, index) => {
      const onPressRemoveButton = () => {
        fields.remove(index);
      };
      const count = index + 1;

      return (
        <View
          style={style.optionItem}
          key={index}
        >
          <Field
            name={`${optionItem}`}
            component={OptionInput}
            keyboard='default'
            placeholder={`OPTION ${count}`}
            maxLength={30}
            borderColor={QuestionOptionsColor[`Option${count}`]}
            onPressRemoveInputButton={index > 1 && onPressRemoveButton}
          />
        </View>
      );
    },
  );

  return (
    <View>
      {renderOptionsFields()}
      {
        fields.length < 7 &&
        <View style={style.addOptionButtonWraper}>
          <TouchableOpacity
            onPress={onPressAddButton}
          >
            <Icon
              name='add-option'
              color={mainColor}
              size={28}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default OptionFieldsArray;
