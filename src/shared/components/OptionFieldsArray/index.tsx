import React from 'react';
import style from './style';

import { View, TouchableOpacity } from 'react-native';
import { Field, WrappedFieldArrayProps, WrappedFieldProps } from 'redux-form';
import OptionInput from '../../../shared/components/OptionInput';

import { QuestionOptionsColor } from '../../../app.style';

type Props = WrappedFieldProps & WrappedFieldArrayProps<any>;

const OptionFieldsArray: React.FunctionComponent<Props> = (props: Props) => {
  const {fields} = props;
  const onPressAddButton = () => fields.push({});

  const renderOptionsFields = () => fields.map((optionItem, index) => {
      const onPressRemoveButton = () => {
        fields.remove(index)
      }
      const count = index + 1;

      return (
        <View
          style={style.optionItem}
          key={index}
        >
          <Field
            name={`${optionItem}.option`}
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
            style={style.addOptionButton}
            onPress={onPressAddButton}
          >
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default OptionFieldsArray;
