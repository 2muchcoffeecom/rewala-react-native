import { StyleSheet, Platform } from 'react-native';
import {
  fontFamilyRegular, whiteColor, shadowColor, errorColor, errorBorderColor, blackTextColor,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 64,
    paddingBottom: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    height: 40,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: whiteColor,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainerError: {
    marginBottom: 5,
    borderWidth: 0.7,
    borderStyle: 'solid',
    borderColor: errorBorderColor,
  },
  inputText: {
    width: '100%',
    paddingRight: 25,
    fontFamily: fontFamilyRegular,
    fontSize: 12,
    fontWeight: '400',
    color: blackTextColor,
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