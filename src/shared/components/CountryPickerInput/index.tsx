import React from 'react';
import { View, Text } from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import style from './style';
import CountryPicker from 'react-native-country-picker-modal';
import deviceService from '../../services/device.service';

type Props = WrappedFieldProps;

export const CountryPickerInput: React.FunctionComponent<Props> = (props: Props) => {
  const {input, meta: {touched, error}} = props;

  const changeCountry = (value: any) => {
    input.onChange(value.callingCode ? `+${value.callingCode}` : '');
  };

  return (
    <View style={style.root}>
      <View style={
        touched && error ?
          [style.countryPickerInput, style.inputContainerError] :
          style.countryPickerInput
      }>
        <CountryPicker
          onChange={changeCountry}
          cca2={deviceService.userLocaleCountryCode}
          flagType='flat'
          filterable={true}
          hideAlphabetFilter={true}
          showCallingCode={true}
          translation='eng'
          styles={{
            imgStyle: style.countryPickerImg,
          }}
        />
        <Text style={style.countryPickerText}>{input.value}</Text>
      </View>
      {touched && (error &&
        <Text style={style.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CountryPickerInput;