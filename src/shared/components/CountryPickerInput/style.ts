import { StyleSheet, Platform } from 'react-native';
import {
  fontFamilyRegular, shadowColor, errorColor, errorBorderColor, blackTextColor,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 64,
    paddingBottom: 5,
  },
  countryPickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: 76,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  countryPickerText: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 12,
    color: blackTextColor,
  },
  countryPickerImg: {
    width: 20,
    height: 13.3,
    marginTop: -2,
  },
  inputContainerError: {
    marginBottom: 5,
    borderWidth: 0.7,
    borderStyle: 'solid',
    borderColor: errorBorderColor,
  },
  errorText: {
    width: '100%',
    marginLeft: 3,
    fontFamily: fontFamilyRegular,
    fontSize: 10,
    fontWeight: '400',
    color: errorColor,
  },
});

export default style;